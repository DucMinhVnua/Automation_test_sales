const { Builder, By, until, error } = require("selenium-webdriver");
const { expect } = require("chai");
const {
  openLoginPage,
  getFieldEmail,
  onClickLoginBtn,
  getMessageEmailError,
} = require("../pages/loginPage.js");
const config = require("../config/config.js");

describe("Login Page", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Check placeholder in email field", async () => {
    await openLoginPage(driver);
    const emailField = await getFieldEmail(driver);
    const attrPlaceholder = await emailField.getAttribute("placeholder");

    expect(attrPlaceholder).to.equal("Email của bạn *");
    // const errorMsg = await driver
    //   .wait(
    //     until.elementLocated(
    //       By.xpath("/html/body/section[2]/div/div/div[1]/form/p[1]")
    //     ),
    //     10000
    //   )
    //   .getText();
  }).timeout(10000);

  it("Check issue display error message when @ character not exist in email field", async () => {
    await openLoginPage(driver);
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("invalidate.com");
    await onClickLoginBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(2000);

    const newUrl = await driver.getCurrentUrl();
    const urlBase = `${config.baseURL}/user/account`;

    expect(urlBase).to.equal(newUrl);
  }).timeout(10000);

  it("Check issue display error message when the email field is empty when sent", async () => {
    await openLoginPage(driver);
    await onClickLoginBtn(driver);

    await driver.sleep(2000);

    const errorMsg = await getMessageEmailError(driver);
    expect(errorMsg).to.equal("Vui lòng nhập email đăng nhập");
  }).timeout(10000);

  after(async () => {
    await driver.quit();
  });
});
