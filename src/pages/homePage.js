const { By } = require("selenium-webdriver");
const config = require("../config/config.js");

async function openHomePage(driver) {
  await driver.get(config.baseURL);
}

async function getTitle(driver) {
  return await driver.getTitle();
}

async function getHeading(driver) {
  return await driver.findElement(By.tagName("h1")).getText();
}

async function getOffered(driver) {
  return await driver.findElement(By.id("SIvCob")).getText();
}

async function getMoreInfoLink(driver) {
  return await driver.findElement(By.css("a")).getAttribute("href");
}

async function onClickAbout(driver) {
  return await driver.findElement(By.className("pHiOh")).click();
}

async function navigatePage(driver, url) {
  await driver.get(url);
}

async function backPage(driver) {
  await driver.navigate().back();
}

module.exports = {
  openHomePage,
  getTitle,
  getHeading,
  getOffered,
  getMoreInfoLink,
  navigatePage,
  backPage,
  onClickAbout,
};
