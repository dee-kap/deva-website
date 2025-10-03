module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("static/styles.css");
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addCollection("gallery", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/gallery/*.md");
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "dist",
    },
    markdownTemplateEngine: "njk",
  };
};
