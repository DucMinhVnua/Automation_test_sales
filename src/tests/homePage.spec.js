const { Builder } = require("selenium-webdriver");
const { expect } = require("chai");
const { openHomePage, getTitle, getOffered } = require("../pages/homePage");

describe("Home Page", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });
  it("get title", async () => {
    await openHomePage(driver);
    const title = await getTitle(driver);
    expect(title).to.equal("Google");
  });

  it("get title offered", async () => {
    const title = await getOffered(driver);
    expect(title).to.equal("Google offered in:");
  });

  after(async () => {
    await driver.quit();
  });
});
