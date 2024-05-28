const { By, until } = require("selenium-webdriver");
const config = require("../config/config.js");

const openHomePage = async (driver) => {
  await driver.get(`${config.baseURL}`);
};

const onClickSearch = async (driver) => {
  await driver
    .wait(
      until.elementLocated(
        By.xpath("/html/body/header/div[1]/div/nav/div[2]/div[1]/div")
      ),
      5000
    )
    .click();
};

const onClickHiddenSearch = async (driver) => {
  await driver
    .wait(
      until.elementLocated(By.xpath("/html/body/header/div[4]/div/button")),
      5000
    )
    .click();
};

// Kiểm tra có class show-modal-search là search đang hiển thị
const checkDisplaySearch = async (driver) => {
  const searchElm = await driver.wait(
    until.elementLocated(By.xpath("/html/body/header/div[4]")),
    5000
  );

  let className = await searchElm.getAttribute("class");

  return checkHasClass(className);
};

// Check cùng class show-modal-search vì khi search hiển thị sẽ có class này và ngược lại
const checkHiddenSearch = async (driver) => {
  const searchElm = await driver.wait(
    until.elementLocated(By.xpath("/html/body/header/div[4]")),
    5000
  );

  let className = await searchElm.getAttribute("class");

  return !checkHasClass(className);
};

const checkHasClass = (fullClassName) => {
  if (fullClassName.split(" ").includes("show-modal-search")) {
    return true;
  } else {
    return false;
  }
};

const getSearchBar = async (driver) => {
  return await driver.wait(
    until.elementLocated(By.xpath("/html/body/header/div[4]/div/form/input")),
    5000
  );
};

const onClickStartSearch = async (driver) => {
  return await driver
    .wait(
      until.elementLocated(
        By.xpath("/html/body/header/div[4]/div/form/button")
      ),
      5000
    )
    .click();
};

const getProductsName = async (driver) => {
  const productsLocator = By.xpath(
    "/html/body/div[2]/div/div[2]/div[1]/div/div[2]/div/a"
  );

  return await driver.findElements(productsLocator);
};

module.exports = {
  openHomePage,
  onClickSearch,
  checkDisplaySearch,
  onClickHiddenSearch,
  checkHiddenSearch,
  getSearchBar,
  getProductsName,
  onClickStartSearch,
};
