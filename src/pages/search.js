const { By, until } = require("selenium-webdriver");
const config = require("../config/config.js");

const openHomePage = async (driver) => {
  await driver.get(`${config.baseURL}`);
};

const onClickSearch = async (driver) => {
  try {
    await driver
      .wait(
        until.elementLocated(
          By.xpath("/html/body/header/div[1]/div/nav/div[2]/div[1]/div")
        ),
        2000
      )
      .click();
  } catch (error) {
    throw new Error(`clicked search failed: ${error.message}`);
  }
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
  try {
    const productsLocator = By.xpath(
      "/html/body/div[2]/div/div[2]/div[1]/div/div[2]/div/a"
    );

    return await driver.findElements(productsLocator);
  } catch (error) {
    throw new Error(`Get products name fail: ${error.message}`);
  }
};

const performSearchTest = async (driver) => {
  try {
    // Open search bar
    await onClickSearch(driver);
    await driver.sleep(1000);

    // lấy thanh search bar
    const searchBar = await getSearchBar(driver);
    await searchBar.sendKeys("Áo thun");

    // bắt đầu search
    await onClickStartSearch(driver);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProductLinkByIdProduct = async (driver, idProductValue) => {
  try {
    const selector = "a[idproduct][href]";
    return await driver.findElement(By.css(selector));
  } catch (error) {
    throw new Error(`Không tìm thấy thẻ a với idproduct="${idProductValue}"`);
  }
};

const hoverAndClickDetailButton = async (driver, element) => {
  try {
    // Hover vào phần tử
    const actions = driver.actions({ async: true });
    await actions.move({ origin: element }).perform();

    // Đợi cho đến khi nút xem chi tiết hiển thị và có thể click
    await driver.wait(until.elementIsVisible(element), 5000);
    await driver.wait(until.elementIsEnabled(element), 5000);

    // Click vào nút chi tiết
    await element.click();
  } catch (error) {
    throw new Error(
      `Không thể tương tác với nút xem chi tiết: ${error.message}`
    );
  }
};

const getProducts = async (driver) => {
  return await driver.findElements(By.css(".isotope-item"));
};

const getProductTitle = async (prd) => {
  return await prd
    .findElement(
      By.className("stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6")
    )
    .getText();
};

const performProductDetailTest = async (driver) => {
  let searchResults = await getProducts(driver);

  await driver.sleep(2000);

  // Search not found
  if (searchResults.length === 0) {
    throw new Error("Không tìm thấy sản phẩm nào");
  }

  // Find product has keyword "ÁO THUN ĐỎ IN HÌNH"
  let prdFound = null;
  for (let prd of searchResults) {
    const prdTitle = await getProductTitle(prd);
    const textUpperCase = prdTitle.toUpperCase();
    if (textUpperCase === "ÁO THUN ĐỎ IN HÌNH") {
      prdFound = prd;
      break;
    }
  }

  if (!prdFound) {
    throw new Error('Không tìm thấy sản phẩm "ÁO THUN ĐỎ IN HÌNH"');
  }

  const productLink = await getProductLinkByIdProduct(prdFound);

  if (!productLink) {
    throw new Error("Không tìm thấy sản phẩm có thuộc tính idproduct");
  }

  await hoverAndClickDetailButton(driver, productLink);

  await driver.sleep(2000);
};

const findElementPickColor = async (driver) => {
  try {
    return await driver.findElement(By.className("rs1-select2 bor8 bg0"));
  } catch (error) {
    throw new Error("Không tìm thấy elm để chọn màu sản phẩm");
  }
};

const findRedColor = async (driver) => {
  try {
    return await driver.findElement(By.css('li[aria-selected="false"]'));
  } catch (error) {
    throw new Error(`Không tìm thấy option chọn màu đỏ ${error.message}`);
  }
};

const findAddCardBtn = async (driver) => {
  try {
    return await driver.findElement(By.css('button[type="add_cart"]'));
  } catch (error) {
    throw new Error(
      `Không tìm thấy button thêm sản phẩm vào giỏ hàng ${error.message}`
    );
  }
};

const findNotificationSuccess = async (driver) => {
  try {
    return await driver.findElement(By.className("swal-text"));
  } catch (error) {
    throw new Error(`Không tìm thấy thông báo thành công ${error.message}`);
  }
};

const performAddToCartTest = async (driver) => {
  // Tìm đến phần chọn color
  const elmPick = await findElementPickColor(driver);

  // Click vào để mở các options
  elmPick.click();

  // Tìm đến option màu đỏ
  const elmRedOption = await findRedColor(elmPick);

  // Click để chọn màu
  await elmRedOption.click();

  // Click thêm sản phẩm vào giỏ hàng
  const elmAddCardBtn = await findAddCardBtn(driver);
  await elmAddCardBtn.click();

  await driver.sleep(1000);

  // Kiểm tra thông báo thành công
  const notificationSuccess = await findNotificationSuccess(driver);

  const notificationText = await notificationSuccess.getText();

  if (notificationText === "Thêm thành công sản phẩm vào giỏ hàng") {
  } else {
    throw new Error("Thêm vào giỏ hàng thất bại");
  }
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
  performSearchTest,
  performProductDetailTest,
  performAddToCartTest,
};
