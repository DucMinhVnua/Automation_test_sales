const { Builder, By, until, error } = require("selenium-webdriver");
const { expect } = require("chai");
const {
  openRegisterPage,
  getFieldFullName,
  onClickRegisterBtn,
  getMessageErrorFullNameField,
  getMessageErrorEmailField,
  getFieldEmail,
  getMessageErrorPhoneNumberField,
  getFieldPhoneNumber,
  getFieldPassword,
  getFieldConfirmPassword,
  getMessageErrorPasswordField,
  getMessageErrorConfirmPasswordField,
} = require("../pages/registerPage.js");
const config = require("../config/config.js");

describe("Register Page", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Kiểm tra Họ và tên là trường bắt buộc", async () => {
    await openRegisterPage(driver);
    await onClickRegisterBtn(driver);

    await driver.sleep(2000);

    const messageErrorFullNameField = await getMessageErrorFullNameField(
      driver
    );

    expect(messageErrorFullNameField).to.equal("Vui lòng nhập vào họ tên");
  }).timeout(20000);

  it("Kiểm tra placeholder của trường Họ và tên", async () => {
    await openRegisterPage(driver);

    const fullNameField = await getFieldFullName(driver);
    const attrPlaceholder = await fullNameField.getAttribute("placeholder");

    expect(attrPlaceholder).to.equal("Họ và tên *");
  }).timeout(20000);

  it("Kiểm tra thông báo lỗi khi trường Email là rỗng", async () => {
    await openRegisterPage(driver);
    await onClickRegisterBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(2000);

    const messageErrorEmailField = await getMessageErrorEmailField(driver);

    expect(messageErrorEmailField).to.equal("Vui lòng nhập email đăng nhập");
  }).timeout(20000);

  it("Kiểm tra placeholder của trường Email", async () => {
    await openRegisterPage(driver);

    const emailField = await getFieldEmail(driver);
    const attrPlaceholder = await emailField.getAttribute("placeholder");

    expect(attrPlaceholder).to.equal("Email của bạn *");
  }).timeout(20000);

  it("Kiểm tra đăng nhập với email không hợp lệ (sai định dạng)", async () => {
    await openRegisterPage(driver);

    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("invalidate.com");

    await onClickRegisterBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(2000);

    const validationMessage = await emailField.getAttribute(
      "validationMessage"
    );

    expect(validationMessage).to.equal(
      "Please include an '@' in the email address. 'invalidate.com' is missing an '@'."
    );
  }).timeout(20000);

  it("Kiểm tra đăng nhập với Email chứa kí tự đặc biệt trong phần tên người dùng (trước dấu '@')", async () => {
    await openRegisterPage(driver);
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("'?''@.com");
    await onClickRegisterBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(2000);

    const validationMessage = await emailField.getAttribute(
      "validationMessage"
    );

    expect(validationMessage).to.equal(
      "'.' is used at a wrong position in '.com'."
    );
  }).timeout(20000);

  it("Kiểm tra đăng nhập với Email chứa kí tự đặc biệt trong phần tên người dùng (sau dấu '@')", async () => {
    await openRegisterPage(driver);
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("hanhb@?.com");
    await onClickRegisterBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(2000);

    const validationMessage = await emailField.getAttribute(
      "validationMessage"
    );

    expect(validationMessage).to.equal(
      "A part following '@' should not contain the symbol '?'."
    );
  }).timeout(20000);

  it("Kiểm tra đăng kí với Số điện thoại không hợp lệ (sai định dạng)", async () => {
    await openRegisterPage(driver);
    const phoneNumberField = await getFieldPhoneNumber(driver);
    phoneNumberField.sendKeys("091233456789");
    await onClickRegisterBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(2000);

    const messageErrorPhoneNumberField = await getMessageErrorPhoneNumberField(
      driver
    );

    expect(messageErrorPhoneNumberField).to.equal(
      "Không đúng định dạng dữ liệu"
    );
  }).timeout(20000);

  it("Kiểm tra Số điện thoại là trường bắt buộc", async () => {
    await openRegisterPage(driver);
    await onClickRegisterBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(2000);

    const messageErrorPhoneNumberField = await getMessageErrorPhoneNumberField(
      driver
    );

    expect(messageErrorPhoneNumberField).to.equal(
      "Vui lòng nhập vào số điện thoại"
    );
  }).timeout(20000);

  it("Kiểm tra Mật khẩu là trường bắt buộc", async () => {
    await openRegisterPage(driver);
    await onClickRegisterBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(2000);

    const messageErrorPasswordField = await getMessageErrorPasswordField(
      driver
    );

    expect(messageErrorPasswordField).to.equal(
      "Vui lòng nhập mật khẩu đăng nhập"
    );
  }).timeout(20000);

  it("Kiểm tra Nhập lại mật khẩu là trường bắt buộc", async () => {
    await openRegisterPage(driver);
    await onClickRegisterBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(2000);

    const messageErrorConfirmPasswordField =
      await getMessageErrorConfirmPasswordField(driver);

    expect(messageErrorConfirmPasswordField).to.equal(
      "Vui lòng nhập mật khẩu đăng nhập"
    );
  }).timeout(20000);

  it("Kiểm tra placeholder của trường Nhập lại mật khẩu", async () => {
    await openRegisterPage(driver);

    const confirmPasswordField = await getFieldConfirmPassword(driver);
    const attrPlaceholder = await confirmPasswordField.getAttribute(
      "placeholder"
    );

    expect(attrPlaceholder).to.equal("Nhập lại mật khẩu *");
  }).timeout(20000);

  it("Kiểm tra đăng kí với số điện thoại đã tồn tại trong CSDL", async () => {
    await openRegisterPage(driver);

    const phoneNumberField = await getFieldPhoneNumber(driver);
    phoneNumberField.sendKeys("0123456789");
    await onClickRegisterBtn(driver);

    await driver.sleep(2000);

    const messageErrorPhoneNumberField = await getMessageErrorPhoneNumberField(
      driver
    );

    expect(messageErrorPhoneNumberField).to.equal(
      "Số điện thoại không được phép trùng lặp"
    );
  }).timeout(20000);

  it("Kiểm tra đăng ký thành công", async () => {
    await openRegisterPage(driver);

    const fullNameField = await getFieldFullName(driver);
    const fieldEmail = await getFieldEmail(driver);
    const fieldPhoneNumber = await getFieldPhoneNumber(driver);
    const fieldPassword = await getFieldPassword(driver);
    const fieldConfirmPassword = await getFieldConfirmPassword(driver);

    fullNameField.sendKeys("hanhnb2606");
    fieldEmail.sendKeys("hanvnuasl2@gmail.com");
    fieldPhoneNumber.sendKeys("0982763541");
    fieldPassword.sendKeys("123456789");
    fieldConfirmPassword.sendKeys("123456789");

    await onClickRegisterBtn(driver);

    await driver.sleep(2000);

    const homeUrl = config.baseURL;
    const currentUrl = await driver.getCurrentUrl();

    expect(currentUrl).to.equal(`${homeUrl}/`);
  }).timeout(20000);

  after(async () => {
    await driver.quit();
  });
});
