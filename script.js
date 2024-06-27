const { Builder } = require('selenium-webdriver');
const percySnapshot = require('@percy/selenium-webdriver');
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://k8s.bsstag.com/');
    await percySnapshot(driver, 'Browserstack');
  } finally {
    await driver.quit();
  }
})();