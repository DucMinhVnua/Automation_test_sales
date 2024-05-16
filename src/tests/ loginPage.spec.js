const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const { openLoginPage, onClickLoginBtn } = require("../pages/loginPage.js");

describe("Login Page", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Validate email empty", async () => {
    await openLoginPage(driver);
    await onClickLoginBtn(driver);

    const errorMsg = await driver
      .wait(
        until.elementLocated(
          By.xpath("/html/body/section[2]/div/div/div[1]/form/p[1]")
        ),
        10000
      )
      .getText();

    expect(errorMsg).to.equal("Email is required");
  }).timeout(10000);

  after(async () => {
    await driver.quit();
  });
});
