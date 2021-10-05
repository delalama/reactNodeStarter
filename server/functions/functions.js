const { By, until } = require('selenium-webdriver');


function getName() {
  return 'name';
}

exports.getName = getName;

async function waitTillByPresent(driver, by) {
  console.log('¿pasamos?');
  await driver.wait(until.elementLocated(by), 10000);
  console.log('¿pasamosB?');
}

async function click(driver, by) {
  const elem = await driver.findElement(by, 10000);
  elem.click();
  console.log('clicked');
}

async function waitAndReturnWE(driver, by) {
  driver.wait(until.elementLocated(by), 10000);

  const we = await driver.findElement(by, 10000);
  return we;
}

async function waitWhatever(driver, text) {
  const by = By.xpath(text);

  driver.wait(until.elementLocated(by), 10000);

  return  await driver.findElement(by, 10000);
}



exports.wait = waitTillByPresent;
exports.click = click;
exports.waitAndReturnWE = waitAndReturnWE;
exports.waitWhatever = waitWhatever;