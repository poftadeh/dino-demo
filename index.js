const {
  Builder, By, Key, until,
} = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const func = () => console.log('apple');

(async function example() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('chrome://dino/');
    await driver.findElement(By.css('body')).sendKeys(Key.ARROW_UP);
    await driver.executeScript(func);
    await driver.sleep(10000000);
  } finally {
    await driver.quit();
  }
}());

