// to run this file, go to root of the project and run node ./utils/img-process.js
const Image = require("@11ty/eleventy-img");
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const inputDir = "static";
const outputDir = "static";

async function convertToWebP_old(filePath) {
  let stats = await Image(filePath, {
    formats: ["webp"],
    outputDir: "",
    urlPath: "/static/",
    sharpWebpOptions: {
      quality: 80,
    },
  });

  console.log(`Converted: ${filePath}`);
}

async function convertToWebP(filePath) {
  let stats = await Image(filePath, {
    formats: ["webp"],
    outputDir: outputDir,
    urlPath: "/static/",
    sharpWebpOptions: {
      quality: 80,
    },
    filenameFormat: function (id, src, width, format, options) {
      // Preserve original folder structure and filename
      const relativePath = path.relative(inputDir, src); // e.g. gallery/image.jpg
      const parsed = path.parse(relativePath);
      return `${parsed.dir}/${parsed.name}.${format}`; // e.g. gallery/image.webp
    },
  });

  console.log(`Converted: ${filePath}`);
}

// Use glob.sync to get file list
const files = glob.sync(`${inputDir}/**/*.{jpg,jpeg,png}`);

// (async () => {
//   for (const file of files) {
//     await convertToWebP(file);
//   }
// })();
(async () => {
  for (const file of files) {
    // FIX: Ensure the output subdirectory exists before processing
    const relativePath = path.relative(inputDir, file);
    const targetDir = path.join(outputDir, path.dirname(relativePath));

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    await convertToWebP(file);
  }
})();
