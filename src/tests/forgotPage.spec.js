const { Builder, By, until, error } = require("selenium-webdriver");
const { expect } = require("chai");
const {
  getFieldEmail,
  openForgotPage,
  getSendPasswordBtn,
  getMessageErrorEmailField,
  getMessageErrorPopup,
  onClickSendPasswordBtn,
  onClickBackToLoginBtn,
  getBackToLoginBtn,
  getTextBackToLoginBtn,
} = require("../pages/forgotPage.js");
const config = require("../config/config.js");

describe("Forgot Page", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Kiểm tra placeholder của trường Email", async () => {
    await openForgotPage(driver);
    const emailField = await getFieldEmail(driver);
    const attrPlaceholder = await emailField.getAttribute("placeholder");

    expect(attrPlaceholder).to.equal("Email của bạn *");
  }).timeout(10000);

  it("Kiểm tra Email là trường bắt buộc", async () => {
    await openForgotPage(driver);
    const sendPasswordBtn = await getSendPasswordBtn(driver);
    await sendPasswordBtn.click();

    await driver.sleep(2000);

    const messageErrorEmailField = await getMessageErrorEmailField(driver);

    expect(messageErrorEmailField).to.equal("Vui lòng nhập vào email");
  }).timeout(10000);

  it("Kiểm tra với Email không có trong CSDL", async () => {
    await openForgotPage(driver);
    const fieldEmail = await getFieldEmail(driver);
    fieldEmail.sendKeys("emailkhongtontai@gmail.com");

    await onClickSendPasswordBtn(driver);

    await driver.sleep(2000);

    const messageError = await getMessageErrorPopup(driver);

    expect(messageError).to.equal("Thông tin tài khoản không tồn tại");
  }).timeout(10000);

  it("Kiểm tra đăng nhập với email không hợp lệ (sai định dạng)", async () => {
    await openForgotPage(driver);
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("invalidate.com");
    await onClickSendPasswordBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(2000);

    const newUrl = await driver.getCurrentUrl();
    const urlBase = `${config.baseURL}/forgot/password`;

    expect(urlBase).to.equal(newUrl);
  }).timeout(10000);

  it("Kiểm tra đăng nhập với Email chứa kí tự đặc biệt trong phần tên người dùng (trước dấu '@')", async () => {
    await openForgotPage(driver);
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("'?''@.com");
    await onClickSendPasswordBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(2000);

    const newUrl = await driver.getCurrentUrl();
    const forgotUrl = `${config.baseURL}/forgot/password`;

    expect(forgotUrl).to.equal(newUrl);
  }).timeout(10000);

  it("Kiểm tra đăng nhập với Email chứa kí tự đặc biệt trong phần tên người dùng (sau dấu '@')", async () => {
    await openForgotPage(driver);
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("hanhb@'?''.com");
    await onClickSendPasswordBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(2000);

    const newUrl = await driver.getCurrentUrl();
    const forgotUrl = `${config.baseURL}/forgot/password`;

    expect(forgotUrl).to.equal(newUrl);
  }).timeout(10000);

  it("Kiểm tra điều hướng khi nhấn vào nút Quay về trang đăng nhập", async () => {
    await openForgotPage(driver);
    await onClickBackToLoginBtn(driver);

    await driver.sleep(2000);

    const newUrl = await driver.getCurrentUrl();
    const loginUrl = `${config.baseURL}/user/account`;

    expect(loginUrl).to.equal(newUrl);
  }).timeout(10000);

  it("Kiểm tra điều hướng khi nhấn vào nút Quay về trang đăng nhập", async () => {
    await openForgotPage(driver);
    const textBackToLoginBtn = await getTextBackToLoginBtn(driver);
    expect(textBackToLoginBtn).to.equal("Quay về màn đăng nhập");
  }).timeout(10000);

  after(async () => {
    await driver.quit();
  });
});
