const { Builder, By, until, error } = require("selenium-webdriver");
const { expect } = require("chai");
const {
  openLoginPage,
  getFieldEmail,
  onClickLoginBtn,
  getMessageEmailError,
  getFieldPassword,
  getMessagePasswordError,
  getTextOfLoginBtn,
  getTextOfForgotPasswordBtn,
  getElmForgotPassword,
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

  it("Check issue display error when password empty", async () => {
    await openLoginPage(driver);

    let isError = false;

    // Kiểm tra trường bấm mà chưa nhập khoảng trắng
    await onClickLoginBtn(driver);
    await driver.sleep(2000);
    const errorMsg = await getMessagePasswordError(driver);
    const isError1 = errorMsg === "Vui lòng nhập mật khẩu đăng nhập";

    // Kiểm tra trường hợp bấm đa nhập khoảng trắng
    const fieldPassword = await getFieldPassword(driver);
    fieldPassword.sendKeys("      ");
    await onClickLoginBtn(driver);
    await driver.sleep(2000);
    const errorMsg1 = await getMessagePasswordError(driver);
    const isError2 = errorMsg1 === "Vui lòng nhập mật khẩu đăng nhập";

    // Thoả mãn 2 điều kiện đã đề ra
    isError = isError1 && isError2;

    expect(isError).to.equal(true);
  }).timeout(10000);

  it("Check text of login button", async () => {
    await openLoginPage(driver);
    const textOfLoginBtn = await getTextOfLoginBtn(driver);
    expect(textOfLoginBtn).to.equal("ĐĂNG NHẬP");
  }).timeout(10000);

  it("Check text of forgot password", async () => {
    await openLoginPage(driver);
    const textOfForgotPasswordBtn = await getTextOfForgotPasswordBtn(driver);
    expect(textOfForgotPasswordBtn).to.equal("Quên mật khẩu");
  }).timeout(10000);

  it("Check navigate of forgot password", async () => {
    await openLoginPage(driver);
    const elmForgotPassword = await getElmForgotPassword(driver);
    await elmForgotPassword.click();
    await driver.sleep(2000);

    const currentUrl = await driver.getCurrentUrl();
    expect(new URL(currentUrl).pathname).to.equal("/forgot/password");
  }).timeout(10000);

  after(async () => {
    await driver.quit();
  });
});
