const fs = require("fs");
const path = require("path");

const basePath = "static";

function getImages(projectName) {
  const folder = path.join(__dirname, "..", "..", basePath, projectName);
  if (!fs.existsSync(folder)) return [];

  return fs
    .readdirSync(folder)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map((file) => `/${basePath}/${projectName}/${file}`);
}

module.exports = [
  { name: "p1", images: getImages("p1") },
  { name: "p2", images: getImages("p2") },
  { name: "p3", images: getImages("p3") },
];
