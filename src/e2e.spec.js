const percySnapshot = require("@percy/puppeteer");

describe("app", () => {
  beforeAll(async () => {
    await page.goto(URL);
  });

  it("MoneyInput", async () => {
    await expect(page).toMatch("MoneyInput");
    await percySnapshot(page, "MoneyInput");
  });
});
