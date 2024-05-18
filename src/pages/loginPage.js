const { By, until } = require("selenium-webdriver");
const config = require("../config/config.js");

const openLoginPage = async (driver) => {
  await driver.get(`${config.baseURL}/user/account`);
};

const getFieldEmail = async (driver) => {
  return await driver.findElement(
    By.xpath("/html/body/section[2]/div/div/div[1]/form/div[1]/input")
  );
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
  return await driver.findElement(
    By.xpath("/html/body/section[2]/div/div/div[1]/form/div[2]/input")
  );
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
};
