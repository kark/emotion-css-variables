module.exports = {
  verbose: true,
  preset: "jest-puppeteer",
  globals: {
    URL: "http://localhost:3000",
  },
  testRegex: "./*\\e2e\\.spec\\.js$",
};
