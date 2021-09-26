const { By, until } = require('selenium-webdriver');
let driver;
const funx = require('./functions');

async function intranetLogin(credens, incomeDriver) {
  driver = incomeDriver;
  driver.get('https://intrabox.altia.es');

  console.log('Introduciendo credenciales');
  //login
  funx.wait(driver, By.id('username'));
  funx.wait(driver, By.id('password'));
  const userNameWE = await driver
    .findElement(By.id('username'), 1000)
    .sendKeys(credens.name);
  const passwordWE = await driver
    .findElement(By.id('password'), 1000)
    .sendKeys(credens.password);
  console.log('Credenciales introducidas');
}

exports.intranetLogin = intranetLogin;

async function aprietaLoginBtn(driver) {
  console.log('Apretando login');
  const loginBy = By.id('kc-login');

  const loginBtn = await driver.findElement(loginBy, 1000);
  loginBtn.click();
  // funx.wait(driver, loginBy);
  // funx.click(driver, loginBy);
  console.log('login clicked');

  var elem = driver.wait(
    until.elementLocated(
      By.css('body > header > nav > ul.o_menu_sections > li:nth-child(3) > a')
    ),
    10000
  );

  return elem;
}

exports.aprietaLoginBtn = aprietaLoginBtn;

async function goToHours(driver, elem) {
  console.log('Botón login apretado');

  // click en administrar asistencias/asistencias
  console.log('esperando carga página');

  await elem.click();

  const asistenciasBy = By.xpath(
    '/html/body/header/nav/ul[2]/li[3]/div/a/span'
  );
  await funx.wait(driver, asistenciasBy);
  await funx.click(driver, asistenciasBy);

  return 'Estamos en la página de las horas';
}
exports.goToHours = goToHours;

async function getHours(driver, text) {
  console.log(text);

  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, '0') ; 

  console.log('mes número: ' + mm);

  const hoursArray = null;
  return hoursArray;
}
exports.getHours = getHours;

const value = 'estefan';
exports.value = value;
