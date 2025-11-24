// To run: node script/convert-webp.js

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function convertDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      convertDir(full);
      continue;
    }

    if (!/\.(png|jpg|jpeg)$/i.test(file)) continue;

    const output = full.replace(/\.(png|jpg|jpeg)$/i, ".webp");

    sharp(full)
      .webp({ quality: 80 })
      .toFile(output)
      .then(() => console.log("Converted:", output))
      .catch((e) => console.error(e));
  }
}

convertDir(path.join(process.cwd(), "public"));
