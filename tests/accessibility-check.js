const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const pages = ["index.html", "bio.html", "certif.html", "setup.html"];
let failures = 0;
function check(condition, message) {
  if (!condition) { failures += 1; console.error("FAIL:", message); }
}
for (const page of pages) {
  const file = path.join(root, page);
  check(fs.existsSync(file), page + " existe");
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  check(/<html[^>]+lang=["'][^"']+["']/i.test(html), page + " declara idioma");
  check(/<title>[^<]+<\/title>/i.test(html), page + " tem title");
  check(/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{10,}/i.test(html), page + " tem descrição");
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    check(/\balt=["'][^"']*["']/i.test(image[0]), page + " tem alt em todas as imagens");
  }
}
if (failures) process.exit(1);
console.log("Accessibility checks passed.");
