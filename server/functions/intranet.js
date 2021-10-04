const { HourglassEmpty } = require('@material-ui/icons');
const moment = require('moment');
const { By, until, Key } = require('selenium-webdriver');
const funx = require('./functions');

let driver;

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

  var elem = driver.wait(
    until.elementLocated(
      By.css(
        'body > div.o_main.o_chatter_position_normal > main > div.o_content > div > div > table > tbody > tr.o_data_row > td:nth-child(3)'
      )
    ),
    10000
  );

  return elem;
}
exports.goToHours = goToHours;

async function getHours(driver, elem) {
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, '0');

  console.log('Mes actual: ' + mm);

  const leftColumnDataBy = By.css(
    'body > div.o_main.o_chatter_position_normal > main > div.o_content > div > div > table > tbody > tr.o_data_row > td:nth-child(3)'
  );
  const rightColumnDataBy = By.css(
    'body > div.o_main.o_chatter_position_normal > main > div.o_content > div > div > table > tbody > tr.o_data_row> td:nth-child(4)'
  );
  const motivoDataBy = By.css(
    'body > div.o_main.o_chatter_position_normal > main > div.o_content > div > div > table > tbody > tr.o_data_row > td:nth-child(6)'
  );

  let leftColumnDataWE = await driver.findElements(leftColumnDataBy);
  const rightColumnDataWE = await driver.findElements(rightColumnDataBy);
  const motivoDataWE = await driver.findElements(motivoDataBy);

  let dayDates = await getDataFromColumn(leftColumnDataWE, 'dia');
  let leftDates = await getDataFromColumn(leftColumnDataWE, 'hora');
  let rightDates = await getDataFromColumn(rightColumnDataWE, 'hora');
  let reasons = await getReason(motivoDataWE);

  let allData = [];

  leftDates.forEach((elem, index) => {
    allData.push({
      id: index,
      dia: dayDates[index],
      horaEntrada: elem,
      horaSalida: rightDates[index],
      motivo: reasons[index],
    });
  });

  return allData;
}

exports.getHours = getHours;

async function getDataFromColumn(WEArray, data) {
  // formato moment
  const formato = 'DD/MM/YYYY HH:mm:s';
  const dataArr = [];

  for (let we of WEArray) {
    let texto = await we.getText();

    await moment(texto, formato).isValid();

    let date = moment(texto, formato);

    if (data === 'dia') {
      date = date.format('DD/MM/YYYY');
    } else if (data === 'hora') {
      date = date.format('HH:mm');
    }

    dataArr.push(date);
  }
  return dataArr;
}

async function getReason(WEArray) {
  const data = [];

  for (let we of WEArray) {
    let texto = await we.getText();

    data.push(texto.substring(18));
  }

  return data;
}

const value = 'estefan';
exports.value = value;


