const { Builder } = require('selenium-webdriver');
const percySnapshot = require('@percy/selenium-webdriver');
const browsers = ['firefox','edge'];
const resolutions = [375, 480, 720, 1280, 1440, 1920];
const environments = [
  { name: 'Prod', url: 'https://www.browserstack.com' },
  { name: 'Non-Prod', url: 'https://k8s.bsstag.com' }
];
const endpoints = [
  '/',
  '/pricing',
  '/integrations/automate',
  '/docs'
];
async function runSnapshots() {
  for (const browser of browsers) {
    for (const resolution of resolutions) {
      for (const env of environments) {
        for (const endpoint of endpoints) {
          let driver = await new Builder().forBrowser(browser).build();
          try {
            await driver.manage().window().setRect({ width: resolution, height: 800 });
            const url = `${env.url}${endpoint}`;
            await driver.get(url);
            await percySnapshot(driver, `${env.name} ${endpoint} ${resolution}px on ${browser}`);
          } finally {
            await driver.quit();
          }
        }
      }
    }
  }
}
runSnapshots();