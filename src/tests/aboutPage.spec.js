const { Builder } = require("selenium-webdriver");
const { expect } = require("chai");
const { openHomePage, onClickAbout, getTitle } = require("../pages/homePage");

describe("About page", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("get title", async () => {
    await openHomePage(driver);
    await onClickAbout(driver);
    const title = await getTitle(driver);
    expect(title).to.equal("Google - Giới thiệu");
  }).timeout(10000);

  after(async () => {
    await driver.quit();
  });
});
