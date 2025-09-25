const fs = require("fs");
const path = require("path");

const basePath = "static/projects";

function getImages(projectName) {
  const folder = path.join(__dirname, "..", "..", basePath, projectName);
  if (!fs.existsSync(folder)) return [];

  return fs
    .readdirSync(folder)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map((file) => `/${basePath}/${projectName}/${file}`);
}

function getProjects() {
  const projectsFolder = path.join(__dirname, "..", "..", basePath);
  if (!fs.existsSync(projectsFolder)) return [];

  return fs
    .readdirSync(projectsFolder)
    .filter((name) =>
      fs.statSync(path.join(projectsFolder, name)).isDirectory()
    )
    .map((name) => ({
      name,
      images: getImages(name),
    }));
}

module.exports = getProjects();
