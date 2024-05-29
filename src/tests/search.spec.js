const { Builder, By, until, error } = require("selenium-webdriver");
const { expect } = require("chai");
const {
  openHomePage,
  onClickSearch,
  checkDisplaySearch,
  onClickHiddenSearch,
  checkHiddenSearch,
  getSearchBar,
  getProductsName,
  onClickStartSearch,
} = require("../pages/search.js");
const config = require("../config/config.js");

describe("Search", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Kiểm tra chức năng mở lightbox Tìm kiếm", async () => {
    await openHomePage(driver);
    await onClickSearch(driver);

    await driver.sleep(1000);

    const searchDisplay = await checkDisplaySearch(driver);

    expect(
      searchDisplay === false,
      "Lỗi thanh tìm kiếm không hiển thị khi nhấn vào nút tìm kiếm"
    ).to.be.false;
  }).timeout(20000);

  it("Kiểm tra chức năng tắt lightbox Tìm kiếm", async () => {
    await openHomePage(driver);

    // 1. mở search
    await onClickSearch(driver);

    // 2. bỏ qua sự kiện
    await driver.sleep(1000);

    // 3. check search opened
    const searchDisplay = await checkDisplaySearch(driver);

    // 4. search mà không hiển thị thì lỗi luôn
    if (searchDisplay === false) {
      expect(
        searchDisplay === false,
        "Lỗi thanh tìm kiếm không hiển thị khi nhấn vào nút tìm kiếm"
      ).to.be.false;

      return;
    }

    // 5. tắt search
    await onClickHiddenSearch(driver);

    // 6. bỏ qua sự kiện
    await driver.sleep(1000);

    // 7. check search ẩn
    const searchHidden = await checkHiddenSearch(driver);

    expect(
      searchHidden === false,
      "Lỗi thanh tìm kiếm không ẩn khi nhấn vào nút x"
    ).to.be.false;
  }).timeout(20000);

  it("Kiểm tra kết quả tìm kiếm theo tên sản phẩm", async () => {
    await openHomePage(driver);

    // mở search
    await onClickSearch(driver);

    // bỏ qua sự kiện
    await driver.sleep(1000);

    // kiểm tra search bar mở
    const searchDisplay = await checkDisplaySearch(driver);

    if (searchDisplay === false) {
      expect(
        searchDisplay === false,
        "Lỗi thanh tìm kiếm không hiển thị khi nhấn vào nút tìm kiếm"
      ).to.be.false;

      return;
    }

    // lấy thanh search bar
    const searchBar = await getSearchBar(driver);
    await searchBar.sendKeys("Áo thun");

    // bắt đầu search
    await onClickStartSearch(driver);

    // bỏ qua sự kiện
    await driver.sleep(3000);

    let searchResults = await getProductsName(driver);

    // kiểm tra trong tên có từ Áo thun không
    let allProductsContainText = true;

    for (let result of searchResults) {
      let text = await result.getText();

      // đổi thành text viết hoa
      const textUpperCase = text.toUpperCase();
      if (!textUpperCase.includes("ÁO THUN")) {
        allProductsContainText = false;
        break;
      }
    }

    expect(
      allProductsContainText === false,
      "Kết quả tìm kiếm sản phẩm có từ Áo thun sai do có chứa sản phẩm khác tên"
    ).to.be.false;
  }).timeout(100000);

  after(async () => {
    await driver.quit();
  });
});
