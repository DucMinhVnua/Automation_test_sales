const { By, until } = require("selenium-webdriver");
const config = require("../config/config.js");

const openRegisterPage = async (driver) => {
  await driver.get(`${config.baseURL}/user/account`);
};

const getFieldFullName = async (driver) => {
  return await driver.findElement(
    By.xpath("/html/body/section[2]/div/div/div[2]/form/div[1]/input")
  );
};

const getFieldEmail = async (driver) => {
  return await driver.findElement(
    By.xpath("/html/body/section[2]/div/div/div[2]/form/div[2]/input")
  );
};

const getFieldPhoneNumber = async (driver) => {
  return await driver.findElement(
    By.xpath("/html/body/section[2]/div/div/div[2]/form/div[3]/input")
  );
};

const getFieldPassword = async (driver) => {
  return await driver.findElement(
    By.xpath("/html/body/section[2]/div/div/div[2]/form/div[4]/input")
  );
};

const getFieldConfirmPassword = async (driver) => {
  return await driver.findElement(
    By.xpath("/html/body/section[2]/div/div/div[2]/form/div[5]/input")
  );
};

const getRegisterBtn = async (driver) => {
  return await driver.findElement(
    By.xpath("/html/body/section[2]/div/div/div[2]/form/button")
  );
};

const onClickRegisterBtn = async (driver) => {
  const registerBtn = await getRegisterBtn(driver);
  await registerBtn.click();
};

const getMessageErrorFullNameField = async (driver) => {
  return await driver
    .wait(
      until.elementLocated(
        By.xpath("/html/body/section[2]/div/div/div[2]/form/p[1]")
      ),
      5000
    )
    .getText();
};

const getMessageErrorEmailField = async (driver) => {
  return await driver
    .wait(
      until.elementLocated(
        By.xpath("/html/body/section[2]/div/div/div[2]/form/p[2]")
      ),
      5000
    )
    .getText();
};

const getMessageErrorPhoneNumberField = async (driver) => {
  return await driver
    .wait(
      until.elementLocated(
        By.xpath("/html/body/section[2]/div/div/div[2]/form/p[3]")
      ),
      5000
    )
    .getText();
};

const getMessageErrorPasswordField = async (driver) => {
  return await driver
    .wait(
      until.elementLocated(
        By.xpath("/html/body/section[2]/div/div/div[2]/form/p[4]")
      ),
      5000
    )
    .getText();
};

const getMessageErrorConfirmPasswordField = async (driver) => {
  return await driver
    .wait(
      until.elementLocated(
        By.xpath("/html/body/section[2]/div/div/div[2]/form/p[5]")
      ),
      5000
    )
    .getText();
};

module.exports = {
  openRegisterPage,
  getFieldFullName,
  getRegisterBtn,
  onClickRegisterBtn,
  getMessageErrorFullNameField,
  getFieldEmail,
  getMessageErrorEmailField,
  getFieldPhoneNumber,
  getMessageErrorPhoneNumberField,
  getFieldPassword,
  getFieldConfirmPassword,
  getMessageErrorPasswordField,
  getMessageErrorConfirmPasswordField,
};
