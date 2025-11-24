/**
 * generate-project-map.js
 *
 * Run from project root:
 *   node scripts/generate-project-map.js
 *
 * Outputs (scripts/output/):
 *   - project-map.md
 *   - project-map.json
 *   - mermaid-tree.mmd
 *   - mermaid-imports.mmd
 *   - mermaid-full.mmd
 *   - report.txt
 *
 * Config (edit if needed):
 *   ROOT: project root (absolute or relative)
 *   EXCLUDE_NODE_MODULES: true (we skip node_modules)
 *   EXTENSIONS: ['.js','.jsx','.ts','.tsx']
 *   OUTPUT_DIR: './scripts/output'
 *
 * Notes:
 * - Script is best-effort and conservative; for complex AST-level detection you'd use a parser.
 * - On Windows, run in PowerShell from project root or use node with full path.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// ---------- CONFIG ----------
const ROOT = path.resolve("W:/nRoot/web"); // <--- your root
const EXCLUDE_NODE_MODULES = true;
const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];
const OUTPUT_DIR = path.join(ROOT, "scripts", "output");
const MAX_LARGE_FILE_BYTES = 200 * 1024; // 200 KB threshold for "large"
// ---------- END CONFIG ----------

if (!fs.existsSync(ROOT)) {
  console.error("Root folder not found:", ROOT);
  process.exit(1);
}

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// utility helpers
function isCodeFile(file) {
  return EXTENSIONS.includes(path.extname(file).toLowerCase());
}

function safeRead(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch (e) {
    return "";
  }
}

function fileHash(file) {
  try {
    const b = fs.readFileSync(file);
    return crypto.createHash("md5").update(b).digest("hex");
  } catch (e) {
    return null;
  }
}

// walk directory (excluded node_modules optionally)
function walkDir(dir, callback) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    let stat;
    try {
      stat = fs.statSync(full);
    } catch (e) {
      continue;
    }
    if (stat.isDirectory()) {
      if (EXCLUDE_NODE_MODULES && item === "node_modules") continue;
      walkDir(full, callback);
    } else {
      callback(full, stat);
    }
  }
}

// gather files and metadata
const allFiles = [];
walkDir(ROOT, (file, stat) => {
  allFiles.push({ path: file, size: stat.size });
});

// Filter to code files and assets
const codeFiles = allFiles.filter(f => isCodeFile(f.path));
const assetFiles = allFiles.filter(f => {
  const ext = path.extname(f.path).toLowerCase();
  // images, videos, documents
  return [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".avif", ".mp4", ".mov", ".pdf"].includes(ext);
});

// Build quick maps
const fileContentCache = {};
for (const f of codeFiles) {
  fileContentCache[f.path] = safeRead(f.path);
}

// regex helpers
const importRegex = /import\s+(?:[\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g;
const requireRegex = /require\(\s*['"]([^'"]+)['"]\s*\)/g;
const jsxImageRegex = /<Image[^>]*src\s*=\s*{?\s*['"]([^'"]+)['"]|<Image[^>]*src\s*=\s*{([^}]+)}/g; // best-effort
const imgTagRegex = /<img[^>]*src\s*=\s*['"]([^'"]+)['"][^>]*>/g;
const classNameRegex = /class(Name)?\s*=\s*["'`]([^"'`]+)["'`]/g;
const hookRegex = /\b(useState|useEffect|useRef|useMemo|useCallback|useContext)\b/g;
const formRegex = /<form\b/;
const motionImportRegex = /from\s+['"]framer-motion['"]/;
const nextImageImportRegex = /from\s+['"]next\/image['"]/;
const nextLinkImportRegex = /from\s+['"]next\/link['"]/;
const nextNavRegex = /from\s+['"]next\/navigation['"]/;
const modalFileNameRegex = /modal|Modal/;
const exportDefaultRegex = /export\s+default\s+function\s+([A-Za-z0-9_]+)/;
const exportConstRegex = /export\s+const\s+([A-Za-z0-9_]+)/;

// collect imports map
const importsMap = {}; // file -> [imports...]
const reverseImportMap = {}; // target -> [files importing it]
const componentList = []; // components under /components
const pages = []; // files under /app (best-effort pages)
const stats = {
  totalFiles: allFiles.length,
  codeFiles: codeFiles.length,
  assetFiles: assetFiles.length,
};

// scan code files for imports and patterns
for (const f of codeFiles) {
  const rel = path.relative(ROOT, f.path);
  const content = fileContentCache[f.path] || "";

  const imports = new Set();
  let m;
  while ((m = importRegex.exec(content))) {
    imports.add(m[1]);
  }
  while ((m = requireRegex.exec(content))) {
    imports.add(m[1]);
  }
  importsMap[rel] = Array.from(imports);

  // reverse map: we will normalize relative component imports in later step
  for (const imp of imports) {
    if (!reverseImportMap[imp]) reverseImportMap[imp] = new Set();
    reverseImportMap[imp].add(rel);
  }

  // mark pages if under /app (Next app router)
  const pathParts = rel.split(path.sep);
  if (pathParts.includes("app") || rel.startsWith("app" + path.sep) || rel.startsWith("app/")) {
    // heuristics: files named page.js/page.jsx or files inside app/
    if (/\/page\.jsx?$/.test("/" + rel) || /^page\.(js|jsx|ts|tsx)$/.test(path.basename(rel)) || rel.includes("app" + path.sep)) {
      pages.push(rel);
    }
  }

  // collect components: any file under /components
  if (rel.includes(path.join("components") + path.sep) || rel.startsWith("components" + path.sep)) {
    componentList.push(rel);
  }
}

// normalize reverseImportMap keys (best-effort)
function resolveImportToFile(imp, importerPath) {
  // Heuristics:
  // - if imp starts with '.' it's a relative import: resolve
  // - if imp includes 'components' return path like components/...
  // - if imp starts with '/' trim leading slash and return
  // - else leave as package import
  if (!imp) return imp;
  if (imp.startsWith(".")) {
    const importerFull = path.join(ROOT, importerPath);
    const importerDir = path.dirname(importerFull);
    // try possible extensions
    const candidates = [
      path.join(importerDir, imp),
      path.join(importerDir, imp + ".js"),
      path.join(importerDir, imp + ".jsx"),
      path.join(importerDir, imp + ".ts"),
      path.join(importerDir, imp + ".tsx"),
      path.join(importerDir, imp, "index.js"),
      path.join(importerDir, imp, "page.js"),
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        return path.relative(ROOT, c);
      }
    }
    // fallback: normalize and return
    return path.relative(ROOT, path.normalize(path.join(importerDir, imp)));
  } else if (imp.startsWith("/")) {
    return imp.replace(/^\//, "");
  } else if (imp.includes("components")) {
    // keep as-is
    return imp;
  } else {
    // package import (react, tailwind, etc.)
    return imp;
  }
}

// Build page->component mapping by resolving imports
const pageImportsResolved = {}; // pageRel -> [resolved import paths]
for (const pageRel of pages) {
  const full = path.join(ROOT, pageRel);
  const content = safeRead(full);
  const imports = [];
  let m;
  importRegex.lastIndex = 0;
  while ((m = importRegex.exec(content))) {
    imports.push(m[1]);
  }
  requireRegex.lastIndex = 0;
  while ((m = requireRegex.exec(content))) {
    imports.push(m[1]);
  }
  const resolved = [];
  for (const imp of imports) {
    const resolvedPath = resolveImportToFile(imp, pageRel);
    resolved.push(resolvedPath);
  }
  pageImportsResolved[pageRel] = Array.from(new Set(resolved));
}

// Build component usage: which components are imported by which pages/files
const componentUsage = {}; // componentRel -> [pages/files importing]
for (const comp of componentList) {
  componentUsage[comp] = [];
}
for (const [pageRel, imports] of Object.entries(pageImportsResolved)) {
  for (const imp of imports) {
    // if imp resolves to a component file path (string includes components directory)
    if (typeof imp === "string" && (imp.includes("components") || compProbably(imp))) {
      // find matching component path (best-effort)
      // if imp is relative path resolved to file, check exact equality
      const possible = componentList.filter(c => {
        // match by filename or ending
        return c.endsWith(imp) || imp.endsWith(c) || imp.includes(path.basename(c));
      });
      if (possible.length > 0) {
        for (const p of possible) {
          componentUsage[p].push(pageRel);
        }
      } else {
        // nothing matched; ignore for now
      }
    }
  }
}

// helper to detect if an import string likely refers to a component path
function compProbably(imp) {
  if (!imp || typeof imp !== "string") return false;
  return imp.toLowerCase().includes("components") || /[A-Z][a-zA-Z0-9]+/.test(path.basename(imp));
}

// Detect unused components: components with zero usage
const unusedComponents = componentList.filter(c => (componentUsage[c] || []).length === 0);

// Hooks and other feature detection per file
const fileFeatures = {}; // rel -> {hooks:[], usesFramer:false, usesNextImage:false, usesNextLink:false, tailwindCount:0, classList:[] ...}
for (const f of codeFiles) {
  const rel = path.relative(ROOT, f.path);
  const content = fileContentCache[f.path] || "";

  const hooks = [];
  let m;
  hookRegex.lastIndex = 0;
  while ((m = hookRegex.exec(content))) {
    hooks.push(m[1]);
  }

  const usesFramer = motionImportRegex.test(content) || /<motion\./.test(content);
  const usesNextImage = nextImageImportRegex.test(content) || /from\s+['"]next\/image['"]/.test(content) || /<Image\b/.test(content);
  const usesNextLink = nextLinkImportRegex.test(content) || /<Link\b/.test(content);
  const usesNextNav = nextNavRegex.test(content);

  // tailwind class extraction
  const classes = [];
  classNameRegex.lastIndex = 0;
  while ((m = classNameRegex.exec(content))) {
    const cls = m[2].trim();
    if (cls) {
      classes.push(...cls.split(/\s+/).filter(Boolean));
    }
  }

  const tailwindCount = classes.length;

  const hasForm = formRegex.test(content);
  const hasModalName = modalFileNameRegex.test(path.basename(rel)) || /Modal/i.test(content);

  // image usage detection: plain img tags and next/Image usage
  const imgRefs = [];
  imgTagRegex.lastIndex = 0;
  while ((m = imgTagRegex.exec(content))) {
    imgRefs.push(m[1]);
  }
  jsxImageRegex.lastIndex = 0;
  while ((m = jsxImageRegex.exec(content))) {
    if (m[1]) imgRefs.push(m[1]);
    if (m[2]) imgRefs.push(m[2]);
  }

  // detect <Image ... width= ... height= or fill
  const missingNextImageDimensions = (() => {
    // rough scan: occurrences of "<Image" without width= or height= or fill
    const imageTagRegex = /<Image\b([\s\S]*?)\/?>/g;
    let missing = 0;
    let mm;
    while ((mm = imageTagRegex.exec(content))) {
      const tag = mm[1];
      if (!/width\s*=/.test(tag) && !/height\s*=/.test(tag) && !/\bfill\b/.test(tag)) {
        missing++;
      }
    }
    return missing;
  })();

  fileFeatures[rel] = {
    hooks: Array.from(new Set(hooks)),
    usesFramer,
    usesNextImage,
    usesNextLink,
    usesNextNav,
    tailwindCount,
    classes: Array.from(new Set(classes)),
    hasForm,
    hasModalName,
    imgRefs: Array.from(new Set(imgRefs)),
    missingNextImageDimensions,
  };
}

// Tailwind summary across repository
const tailwindCounts = {}; // class -> count
for (const f of Object.keys(fileFeatures)) {
  for (const cls of fileFeatures[f].classes) {
    tailwindCounts[cls] = (tailwindCounts[cls] || 0) + 1;
  }
}
const topTailwind = Object.entries(tailwindCounts).sort((a,b)=>b[1]-a[1]).slice(0,50);

// Image asset usage checks
const allImagePaths = assetFiles.map(a => path.relative(ROOT, a.path));
const referencedImages = new Set();
for (const f of Object.keys(fileFeatures)) {
  for (const iref of fileFeatures[f].imgRefs) {
    // normalize: remove starting "/public" or leading '/'
    const cleaned = iref.replace(/^\/?public\//, "").replace(/^\//, "");
    referencedImages.add(cleaned);
  }
}
// Find orphans (images in /public not referenced)
const orphanImages = allImagePaths.filter(img => !referencedImages.has(img) && !referencedImages.has(path.basename(img)));

// Large files report
const largeFiles = allFiles.filter(f => f.size >= MAX_LARGE_FILE_BYTES).map(f => ({
  path: path.relative(ROOT, f.path),
  sizeKB: Math.round(f.size / 1024)
}));

// Duplicate detection by content hash
const hashMap = {};
for (const f of allFiles) {
  const ext = path.extname(f.path).toLowerCase();
  // only check code and assets for duplicates
  if (isCodeFile(f.path) || [".png",".jpg",".jpeg",".svg",".webp"].includes(ext)) {
    const h = fileHash(f.path);
    if (!h) continue;
    if (!hashMap[h]) hashMap[h] = [];
    hashMap[h].push(path.relative(ROOT, f.path));
  }
}
const duplicates = Object.values(hashMap).filter(arr => arr.length > 1);

// Build component dependency graph (best-effort)
const depGraph = {}; // file -> [resolved files it imports]
for (const f of codeFiles) {
  const rel = path.relative(ROOT, f.path);
  const content = fileContentCache[f.path] || "";
  const deps = [];
  let m;
  importRegex.lastIndex = 0;
  while ((m = importRegex.exec(content))) {
    const imp = m[1];
    const resolved = resolveImportToFile(imp, rel);
    deps.push(resolved);
  }
  requireRegex.lastIndex = 0;
  while ((m = requireRegex.exec(content))) {
    const imp = m[1];
    const resolved = resolveImportToFile(imp, rel);
    deps.push(resolved);
  }
  depGraph[rel] = Array.from(new Set(deps));
}

// Navigation/Routes map for /app pages (best-effort)
// We attempt to map app/page.js paths to route paths.
function routeFromAppPath(rel) {
  // rel like app/consultancy-services/project-management/page.js -> /consultancy-services/project-management
  const p = rel.replace(/\\/g, "/");
  if (!p.startsWith("app/") && !p.startsWith("app/")) return null;
  let route = p.replace(/^app\//, "").replace(/\/page\.(js|jsx|ts|tsx)$/, "");
  if (route === "") route = "/";
  if (!route.startsWith("/")) route = "/" + route;
  return route;
}
const routes = {};
for (const pg of pages) {
  const route = routeFromAppPath(pg);
  if (route !== null) routes[route] = pg;
}

// AI-like heuristic refactor suggestions
const suggestions = [];
if (unusedComponents.length > 0) {
  suggestions.push(`Found ${unusedComponents.length} component files that are not imported anywhere (possible dead code). Consider removing or consolidating them.`);
}
if (topTailwind.length > 50) {
  suggestions.push(`Tailwind usage heavy: top classes list generated. If many files repeat long utility lists, consider extracting components or @apply styles.`);
}
if (duplicates.length > 0) {
  suggestions.push(`Found ${duplicates.length} groups of duplicate files. Consider consolidating duplicates to reduce maintenance.`);
}
if (largeFiles.length > 0) {
  suggestions.push(`Found ${largeFiles.length} large files (>= ${Math.round(MAX_LARGE_FILE_BYTES/1024)} KB). Consider optimizing images or moving to a CDN.`);
}
if (Object.values(fileFeatures).some(f=>f.missingNextImageDimensions>0)) {
  suggestions.push(`Some files use <Image> without width/height or fill; consider adding dimensions or using fill with aspect-ratio container for Next.js optimization.`);
}

// Build final JSON
const projectMap = {
  generatedAt: new Date().toISOString(),
  root: ROOT,
  stats,
  pages,
  routes,
  componentList,
  componentUsage,
  unusedComponents,
  fileFeatures,
  topTailwind,
  orphanImages,
  largeFiles,
  duplicates,
  depGraph,
  suggestions,
};

// Markdown report builder
function humanSize(kb) {
  if (!kb) return "0 KB";
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

let md = `# Project Map for ${ROOT}\n\n`;
md += `**Generated:** ${new Date().toLocaleString()}\n\n`;
md += `## Summary\n\n`;
md += `- Total files scanned: ${stats.totalFiles}\n`;
md += `- Code files: ${stats.codeFiles}\n`;
md += `- Asset files: ${stats.assetFiles}\n\n`;
md += `### Quick findings\n\n`;
md += `- Unused components: ${unusedComponents.length}\n`;
md += `- Duplicate file groups: ${duplicates.length}\n`;
md += `- Large files: ${largeFiles.length}\n`;
md += `- Orphan images: ${orphanImages.length}\n\n`;

md += `## Routes (detected from /app)\n\n`;
for (const [route, pg] of Object.entries(routes)) {
  md += `- \`${route}\` -> \`${pg}\`\n`;
}
md += `\n## Pages and imports (summary)\n\n`;
for (const pg of pages) {
  md += `### ${pg}\n`;
  const imports = pageImportsResolved[pg] || [];
  if (imports.length === 0) md += `- (no imports detected)\n\n`;
  else {
    for (const imp of imports) {
      md += `- imports: \`${imp}\`\n`;
    }
    md += `\n`;
  }
}

// components summary
md += `\n## Components (${componentList.length})\n\n`;
for (const comp of componentList) {
  const usages = componentUsage[comp] || [];
  md += `- \`${comp}\` — used by ${usages.length} file(s)\n`;
}

// top tailwind
md += `\n## Top Tailwind classes (top 50)\n\n`;
for (const [cls, cnt] of topTailwind) {
  md += `- \`${cls}\`: ${cnt}\n`;
}

// Orphan images
md += `\n## Orphan / unused images (${orphanImages.length})\n\n`;
for (const img of orphanImages.slice(0, 200)) {
  md += `- ${img}\n`;
}
if (orphanImages.length > 200) md += `\n(...${orphanImages.length - 200} more)\n`;

// Large files
md += `\n## Large files (> ${Math.round(MAX_LARGE_FILE_BYTES/1024)} KB): ${largeFiles.length}\n\n`;
for (const l of largeFiles) {
  md += `- ${l.path} — ${humanSize(l.sizeKB)}\n`;
}

// Duplicates
md += `\n## Duplicate file groups (${duplicates.length})\n\n`;
for (const group of duplicates) {
  md += `- Group:\n`;
  for (const p of group) md += `  - ${p}\n`;
  md += `\n`;
}

// file feature summary (top files by missing dims or hooks)
const filesMissingDims = Object.entries(fileFeatures).filter(([k,v])=>v.missingNextImageDimensions>0);
md += `\n## Files using <Image> without dimensions: ${filesMissingDims.length}\n\n`;
for (const [k,v] of filesMissingDims.slice(0,50)) {
  md += `- ${k} — missing image dims: ${v.missingNextImageDimensions}\n`;
}

// forms and modals
const filesWithForms = Object.entries(fileFeatures).filter(([k,v])=>v.hasForm).map(([k])=>k);
const filesWithModalName = Object.entries(fileFeatures).filter(([k,v])=>v.hasModalName).map(([k])=>k);

md += `\n## Files containing <form> tags: ${filesWithForms.length}\n\n`;
for (const p of filesWithForms) md += `- ${p}\n`;

md += `\n## Files with 'Modal' in name or content: ${filesWithModalName.length}\n\n`;
for (const p of filesWithModalName) md += `- ${p}\n`;

// suggestions
md += `\n## Suggestions\n\n`;
for (const s of suggestions) md += `- ${s}\n`;

// write outputs
fs.writeFileSync(path.join(OUTPUT_DIR, "project-map.json"), JSON.stringify(projectMap, null, 2), "utf8");
fs.writeFileSync(path.join(OUTPUT_DIR, "project-map.md"), md, "utf8");

// ---------- MERMAID DIAGRAMS ----------
// Version A: directory tree
function buildTreeMermaid() {
  // Only include up to some depth for readability
  const lines = ["```mermaid", "graph TD", `root["${path.basename(ROOT)}"]`];
  // Build a small tree map
  function addNode(parentId, dirPath) {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
      const full = path.join(dirPath, item);
      const rel = path.relative(ROOT, full).replace(/\\/g, "/");
      const id = rel.replace(/[^a-zA-Z0-9_]/g, "_");
      if (fs.statSync(full).isDirectory()) {
        lines.push(`${parentId} --> ${id}["${item}/"]`);
        addNode(id, full);
      } else {
        lines.push(`${parentId} --> ${id}["${item}"]`);
      }
    }
  }
  addNode("root", ROOT);
  lines.push("```");
  return lines.join("\n");
}
const mermaidA = buildTreeMermaid();
fs.writeFileSync(path.join(OUTPUT_DIR, "mermaid-tree.mmd"), mermaidA, "utf8");

// Version B: directory tree + file import graph (simpler)
function buildImportMermaid() {
  const header = ["```mermaid", "graph TD"];
  const nodes = [];
  const links = [];
  // include pages and components only (limit)
  const sampleFiles = codeFiles.slice(0, 800).map(f => path.relative(ROOT, f.path));
  for (const f of sampleFiles) {
    const id = f.replace(/[^a-zA-Z0-9_]/g, "_");
    nodes.push(`${id}["${f}"]`);
    const deps = depGraph[f] || [];
    for (const d of deps.slice(0, 50)) {
      if (!d) continue;
      const did = d.replace(/[^a-zA-Z0-9_]/g, "_");
      links.push(`${id} --> ${did}`);
    }
  }
  return header.concat(nodes).concat(links).concat(["```"]).join("\n");
}
const mermaidB = buildImportMermaid();
fs.writeFileSync(path.join(OUTPUT_DIR, "mermaid-imports.mmd"), mermaidB, "utf8");

// Version C: full imports + cross-page (may be large, so limited)
function buildFullMermaid() {
  const header = ["```mermaid", "graph TD"];
  const nodes = new Set();
  const edges = [];
  // include pages and their imports
  const pageSample = pages.slice(0, 200);
  for (const pg of pageSample) {
    const pid = pg.replace(/[^a-zA-Z0-9_]/g, "_");
    nodes.add(`${pid}["${pg}"]`);
    const deps = depGraph[pg] || [];
    for (const d of deps.slice(0, 200)) {
      if (!d) continue;
      const did = d.replace(/[^a-zA-Z0-9_]/g, "_");
      nodes.add(`${did}["${d}"]`);
      edges.push(`${pid} --> ${did}`);
      // add dependencies of dependencies lightly
      const subDeps = depGraph[d] || [];
      for (const sd of subDeps.slice(0, 20)) {
        if (!sd) continue;
        const sdid = sd.replace(/[^a-zA-Z0-9_]/g, "_");
        nodes.add(`${sdid}["${sd}"]`);
        edges.push(`${did} --> ${sdid}`);
      }
    }
  }
  return header.concat(Array.from(nodes)).concat(edges).concat(["```"]).join("\n");
}
const mermaidC = buildFullMermaid();
fs.writeFileSync(path.join(OUTPUT_DIR, "mermaid-full.mmd"), mermaidC, "utf8");

// summary report
let report = `Project Map Report - ${new Date().toLocaleString()}\n\n`;
report += `Root: ${ROOT}\n`;
report += `Files scanned: ${stats.totalFiles}\n`;
report += `Code files: ${stats.codeFiles}\n`;
report += `Assets: ${stats.assetFiles}\n\n`;
report += `Unused components: ${unusedComponents.length}\n`;
report += `Duplicate groups: ${duplicates.length}\n`;
report += `Large files: ${largeFiles.length}\n`;
report += `Orphan images: ${orphanImages.length}\n\n`;
report += `Output files written to: ${OUTPUT_DIR}\n\n`;
report += `-- Top suggestions --\n`;
for (const s of suggestions) report += `- ${s}\n`;

fs.writeFileSync(path.join(OUTPUT_DIR, "report.txt"), report, "utf8");

console.log("✅ Project map generated.");
console.log("Outputs written to:", OUTPUT_DIR);
console.log("- project-map.md");
console.log("- project-map.json");
console.log("- mermaid-tree.mmd");
console.log("- mermaid-imports.mmd");
console.log("- mermaid-full.mmd");
console.log("- report.txt");
console.log("\nOpen the generated project-map.md and mermaid files in scripts/output/ to review the results.");
