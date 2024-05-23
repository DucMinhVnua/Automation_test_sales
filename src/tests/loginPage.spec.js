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
  getMessageLoginFail,
} = require("../pages/loginPage.js");
const config = require("../config/config.js");

describe("Login Page", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Kiểm tra placeholder của trường Email", async () => {
    await openLoginPage(driver);
    const emailField = await getFieldEmail(driver);
    const attrPlaceholder = await emailField.getAttribute("placeholder");

    expect(attrPlaceholder).to.equal("Email của bạn *");
  });

  it("Kiểm tra đăng nhập với email không hợp lệ (sai định dạng)", async () => {
    await openLoginPage(driver);
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("invalidate.com");
    await onClickLoginBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(1000);

    const validationMessage = await emailField.getAttribute(
      "validationMessage"
    );

    expect(validationMessage).to.equal(
      "Please include an '@' in the email address. 'invalidate.com' is missing an '@'."
    );
  });

  it("Kiểm tra đăng nhập với Email chứa kí tự đặc biệt trong phần tên người dùng (trước dấu '@')", async () => {
    await openLoginPage(driver);
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("'?''@.com");
    await onClickLoginBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(1000);

    const validationMessage = await emailField.getAttribute(
      "validationMessage"
    );

    expect(validationMessage).to.equal(
      "'.' is used at a wrong position in '.com'."
    );
  });

  it("Kiểm tra đăng nhập với Email chứa kí tự đặc biệt trong phần tên người dùng (sau dấu '@')", async () => {
    await openLoginPage(driver);
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("hanhb@?.com");
    await onClickLoginBtn(driver);

    // Wait for a brief moment to ensure any navigation attempts would have been triggered
    await driver.sleep(1000);

    const validationMessage = await emailField.getAttribute(
      "validationMessage"
    );

    expect(validationMessage).to.equal(
      "A part following '@' should not contain the symbol '?'."
    );
  });

  it("Kiểm tra Email là trường bắt buộc", async () => {
    await openLoginPage(driver);
    await onClickLoginBtn(driver);

    await driver.sleep(1000);

    const errorMsg = await getMessageEmailError(driver);
    expect(errorMsg).to.equal("Vui lòng nhập email đăng nhập");
  });

  it("Kiểm tra Mật khẩu là trường bắt buộc", async () => {
    await openLoginPage(driver);

    let isError = false;

    // Kiểm tra trường bấm mà chưa nhập khoảng trắng
    await onClickLoginBtn(driver);
    await driver.sleep(1000);
    const errorMsg = await getMessagePasswordError(driver);
    const isError1 = errorMsg === "Vui lòng nhập mật khẩu đăng nhập";

    // Kiểm tra trường hợp bấm đa nhập khoảng trắng
    const fieldPassword = await getFieldPassword(driver);
    fieldPassword.sendKeys("      ");
    await onClickLoginBtn(driver);
    await driver.sleep(1000);
    const errorMsg1 = await getMessagePasswordError(driver);
    const isError2 = errorMsg1 === "Vui lòng nhập mật khẩu đăng nhập";

    // Thoả mãn 2 điều kiện đã đề ra
    isError = isError1 && isError2;

    expect(isError).to.equal(true);
  });

  it("Check text of login button", async () => {
    await openLoginPage(driver);
    const textOfLoginBtn = await getTextOfLoginBtn(driver);
    expect(textOfLoginBtn).to.equal("ĐĂNG NHẬP");
  });

  it("Check text of forgot password", async () => {
    await openLoginPage(driver);
    const textOfForgotPasswordBtn = await getTextOfForgotPasswordBtn(driver);
    expect(textOfForgotPasswordBtn).to.equal("Quên mật khẩu");
  });

  it("Kiểm tra điều hướng khi nhấn vào nút quên mật khẩu", async () => {
    await openLoginPage(driver);
    const elmForgotPassword = await getElmForgotPassword(driver);
    await elmForgotPassword.click();
    await driver.sleep(1000);

    const currentUrl = await driver.getCurrentUrl();
    expect(new URL(currentUrl).pathname).to.equal("/forgot/password");
  });

  it("Kiểm tra đăng nhập với tài khoản không tồn tại trong CSDL", async () => {
    await openLoginPage(driver);

    // get email field
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("nbhanh@gmail.com");

    // get password field
    const fieldPassword = await getFieldPassword(driver);
    fieldPassword.sendKeys("12345678");
    await onClickLoginBtn(driver);

    await driver.sleep(1000);
    const messageLoginFail = await getMessageLoginFail(driver);

    expect(messageLoginFail).to.equal("Thông tin tài khoản không tồn tại");
  });

  it("Kiểm tra đăng nhập với Mật khẩu không chính xác", async () => {
    await openLoginPage(driver);

    // get email field
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("ndminhvnua@gmail.com");

    // get password field
    const fieldPassword = await getFieldPassword(driver);
    fieldPassword.sendKeys("12345678");
    await onClickLoginBtn(driver);

    await driver.sleep(1000);
    const newUrl = await driver.getCurrentUrl();
    const urlBase = `${config.baseURL}/user/account`;

    expect(urlBase).to.equal(newUrl);
  });

  it("Kiểm tra đăng nhập với tài khoản đã tồn tại trong CSDL", async () => {
    await openLoginPage(driver);

    // get email field
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys("ndminhvnua@gmail.com");

    // get password field
    const fieldPassword = await getFieldPassword(driver);
    fieldPassword.sendKeys("123456789");
    await onClickLoginBtn(driver);

    await driver.sleep(1000);
    const newUrl = await driver.getCurrentUrl();
    const loginUrl = `${config.baseURL}/`;

    expect(loginUrl).to.equal(newUrl);
  });

  after(async () => {
    await driver.quit();
  });
});
