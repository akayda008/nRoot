// scripts/list-missing-image-dims.js
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EXT = [".js", ".jsx", ".ts", ".tsx"];
const scanDir = dir => {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) out.push(...scanDir(full));
    else if (EXT.includes(path.extname(full))) out.push(full);
  }
  return out;
};

const files = scanDir(path.join(ROOT, "components")).concat(scanDir(path.join(ROOT, "app")));

const results = [];

for (const f of files) {
  const content = fs.readFileSync(f, "utf8");
  const regex = /<Image\b([\s\S]*?)\/?>/g;
  let m;
  let i = 0;
  while ((m = regex.exec(content))) {
    i++;
    const tag = m[1];
    const hasWidth = /width\s*=\s*{?\s*\d+/i.test(tag);
    const hasHeight = /height\s*=\s*{?\s*\d+/i.test(tag);
    const hasFill = /\bfill\b/.test(tag);
    if (!hasWidth && !hasHeight && !hasFill) {
      results.push({ file: path.relative(ROOT, f), occurrence: i, snippet: tag.trim().slice(0, 200) });
    }
  }
}

console.log("Files with <Image> missing width/height/fill:", results.length);
for (const r of results) {
  console.log("-", r.file, "occurrence:", r.occurrence);
  console.log("  snippet:", r.snippet);
}
