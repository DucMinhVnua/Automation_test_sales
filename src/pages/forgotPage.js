const { By, until } = require("selenium-webdriver");
const config = require("../config/config.js");

const openForgotPage = async (driver) => {
  await driver.get(`${config.baseURL}/forgot/password`);
};

const getFieldEmail = async (driver) => {
  return await driver.findElement(
    By.xpath("/html/body/section[2]/div/div/div/form/div/input")
  );
};

const getSendPasswordBtn = async (driver) => {
  return await driver.findElement(
    By.xpath("/html/body/section[2]/div/div/div/form/button")
  );
};

const onClickSendPasswordBtn = async (driver) => {
  const sendPasswordBtn = await getSendPasswordBtn(driver);
  await sendPasswordBtn.click();
};

const getMessageErrorEmailField = async (driver) => {
  return await driver
    .wait(
      until.elementLocated(
        By.xpath("/html/body/section[2]/div/div/div/form/p[1]")
      ),
      5000
    )
    .getText();
};

const getMessageErrorPopup = async (driver) => {
  return await driver
    .wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[3]")), 5000)
    .getText();
};

const getBackToLoginBtn = async (driver) => {
  const link = await driver.wait(
    until.elementLocated(
      By.xpath("/html/body/section[2]/div/div/div/form/p/a")
    ),
    5000
  );

  await driver.wait(until.elementIsVisible(link), 10000);

  return link;
};

const onClickBackToLoginBtn = async (driver) => {
  const backToLoginBtn = await getBackToLoginBtn(driver);
  await backToLoginBtn.click();
};

const getTextBackToLoginBtn = async (driver) => {
  const backToLoginBtn = await getBackToLoginBtn(driver);

  return await backToLoginBtn.getText();
};

module.exports = {
  openForgotPage,
  getFieldEmail,
  getSendPasswordBtn,
  getMessageErrorEmailField,
  getMessageErrorPopup,
  onClickSendPasswordBtn,
  getBackToLoginBtn,
  onClickBackToLoginBtn,
  getTextBackToLoginBtn,
};
