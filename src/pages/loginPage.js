const { By } = require("selenium-webdriver");
const config = require("../config/config.js");

const openLoginPage = async (driver) => {
  await driver.get(`${config.baseURL}/user/account`);
};

const onClickLoginBtn = async (driver) => {
  await driver
    .findElement(By.xpath("/html/body/section[2]/div/div/div[1]/form/button"))
    .click();
};

module.exports = {
  openLoginPage,
  onClickLoginBtn,
};
