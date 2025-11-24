// scan-images.js
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const VALID_EXT = [".js", ".jsx", ".tsx"];

const IGNORE_FOLDERS = [
  "node_modules",
  ".next",
  ".git",
  "public",       // your actual images (OK to ignore)
  "build",
  "dist"
];

let report = {
  nextImageMissingDimensions: [],
  imgTagsFound: [],
  filesScanned: 0
};

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      if (IGNORE_FOLDERS.includes(file)) continue;
      walk(full);
      continue;
    }

    if (!VALID_EXT.includes(path.extname(full))) continue;

    report.filesScanned++;

    const content = fs.readFileSync(full, "utf8");

    // 🔥 Detect <Image without width/height/fill
    const nextImageRegex = /<Image([^>]+)>/g;
    let match;
    while ((match = nextImageRegex.exec(content))) {
      const tag = match[0];
      const props = match[1];

      const hasWidth = /width=/.test(props);
      const hasHeight = /height=/.test(props);
      const hasFill = /fill/.test(props);

      if (!hasWidth && !hasHeight && !hasFill) {
        report.nextImageMissingDimensions.push({
          file: full.replace(ROOT, ""),
          snippet: tag.trim()
        });
      }
    }

    // 🔥 Detect <img> tags (not recommended in Next)
    const imgTagRegex = /<img[^>]+>/g;
    const imgMatches = content.match(imgTagRegex);
    if (imgMatches) {
      report.imgTagsFound.push({
        file: full.replace(ROOT, ""),
        count: imgMatches.length,
        snippets: imgMatches
      });
    }
  }
}

// Run the scanner
console.log("🔍 Scanning project for image issues...");
walk(ROOT);

console.log("\n\n===== SCAN REPORT =====\n");

console.log(`📌 Files scanned: ${report.filesScanned}\n`);

console.log("❗ <Image> missing width/height/fill:");
if (report.nextImageMissingDimensions.length === 0) {
  console.log("   ✔ None found");
} else {
  report.nextImageMissingDimensions.forEach((item) => {
    console.log(`- ${item.file}`);
    console.log(`  snippet: ${item.snippet}`);
  });
}

console.log("\n❗ <img> tags found (convert to Next <Image> ideally):");
if (report.imgTagsFound.length === 0) {
  console.log("   ✔ None found");
} else {
  report.imgTagsFound.forEach((item) => {
    console.log(`- ${item.file} (${item.count} occurrences)`);
  });
}

console.log("\n===== END OF REPORT =====\n");
