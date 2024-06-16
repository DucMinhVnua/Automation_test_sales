const { By, until } = require("selenium-webdriver");
const config = require("../config/config.js");
const { ACCOUNT_TEST } = require("../utils/constants.js");

const openLoginPage = async (driver) => {
  await driver.get(`${config.baseURL}/user/account`);
};

const getFieldEmail = async (driver) => {
  try {
    return await driver.findElement(
      By.xpath("/html/body/section[2]/div/div/div[1]/form/div[1]/input")
    );
  } catch (error) {
    throw new Error(`Field email failed: ${error.message}`);
  }
};

const onClickLoginBtn = async (driver) => {
  await driver
    .findElement(By.xpath("/html/body/section[2]/div/div/div[1]/form/button"))
    .click();
};

const getMessageEmailError = async (driver) => {
  return await driver
    .wait(
      until.elementLocated(
        By.xpath("/html/body/section[2]/div/div/div[1]/form/p[1]")
      ),
      5000
    )
    .getText();
};

const getMessagePasswordError = async (driver) => {
  return await driver
    .wait(
      until.elementLocated(
        By.xpath("/html/body/section[2]/div/div/div[1]/form/p[2]")
      ),
      5000
    )
    .getText();
};

const getFieldPassword = async (driver) => {
  try {
    return await driver.findElement(
      By.xpath("/html/body/section[2]/div/div/div[1]/form/div[2]/input")
    );
  } catch (error) {
    throw new Error(`Field password failed: ${error.message}`);
  }
};

const getTextOfLoginBtn = async (driver) => {
  const button = await driver.wait(
    until.elementLocated(
      By.xpath("/html/body/section[2]/div/div/div[1]/form/button")
    )
  );
  await driver.wait(until.elementIsVisible(button), 2000);
  return await button.getText();
};

const getTextOfForgotPasswordBtn = async (driver) => {
  const link = await driver.wait(
    until.elementLocated(By.linkText("Quên mật khẩu")),
    10000 // Timeout after 10 seconds
  );
  await driver.wait(until.elementIsVisible(link), 2000);
  return await link.getText();
};

const getElmForgotPassword = async (driver) => {
  const link = await driver.wait(
    until.elementLocated(By.linkText("Quên mật khẩu")),
    10000 // Timeout after 10 seconds
  );
  await driver.wait(until.elementIsVisible(link), 2000);

  return link;
};

const getMessageLoginFail = async (driver) => {
  const messageError = await driver
    .wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[3]")), 10000)
    .getText();

  return messageError;
};

const performLoginTest = async (driver) => {
  try {
    // get email field
    const emailField = await getFieldEmail(driver);
    await emailField.sendKeys(ACCOUNT_TEST.email);

    // get password field
    const fieldPassword = await getFieldPassword(driver);
    fieldPassword.sendKeys(ACCOUNT_TEST.password);

    await onClickLoginBtn(driver);

    await driver.sleep(1000);
    const newUrl = await driver.getCurrentUrl();
    const loginUrl = `${config.baseURL}/`;

    if (newUrl !== loginUrl) {
      throw new Error("Login thất bại");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  openLoginPage,
  onClickLoginBtn,
  getFieldEmail,
  getFieldPassword,
  getMessageEmailError,
  getMessagePasswordError,
  getTextOfLoginBtn,
  getTextOfForgotPasswordBtn,
  getElmForgotPassword,
  getMessageLoginFail,
  performLoginTest,
};
