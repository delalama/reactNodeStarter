const { By, until } = require('selenium-webdriver');


function getName() {
  return 'name';
}

exports.getName = getName;

async function waitTillByPresent(driver, by) {
  driver.wait(until.elementLocated(by), 10000);
}

async function click(driver, by) {
  const elem = await driver.findElement(by, 10000);
  elem.click();
}
exports.wait = waitTillByPresent;
exports.click = click;