const { Builder } = require("selenium-webdriver");
const { expect } = require("chai");
const { openLoginPage, performLoginTest } = require("../pages/loginPage.js");
const {
  performSearchTest,
  performProductDetailTest,
  performAddToCartTest,
} = require("../pages/search.js");
const config = require("../config/config.js");

describe("Kiểm thử luồng đăng nhập và thanh toán sản phẩm", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Kiểm thử luồng đăng nhập và thanh toán sản phẩm", async () => {
    try {
      // Open page by url
      await openLoginPage(driver);

      await driver.sleep(2000);

      // Login test
      await performLoginTest(driver);

      await driver.sleep(2000);

      // Search test
      await performSearchTest(driver);

      await driver.sleep(2000);

      // Product Detail test
      await performProductDetailTest(driver);

      await driver.sleep(2000);

      // Add to cart test
      await performAddToCartTest(driver);

      await driver.sleep(2000);

      // Payment test
      // await performPaymentTest(driver);
    } catch (error) {
      expect.fail(error.message);
    }
  });

  after(async () => {
    await driver.navigate().to(`${config.baseURL}/logout`);
    await driver.navigate().to(`${config.baseURL}/user/account`);
    await driver.quit();
  });
}).timeout(60000);
