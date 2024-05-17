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

module.exports = {
  openLoginPage,
  onClickLoginBtn,
  getFieldEmail,
  getMessageEmailError,
};
