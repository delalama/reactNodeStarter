const { By, until } = require('selenium-webdriver');
let driver;

async function intranetLogin(credens, incomeDriver) {
  driver = incomeDriver;
  driver.get('https://intrabox.altia.es');

  console.log('Introduciendo credenciales');
  //login
  waitTillByPresent(By.id('username'));
  waitTillByPresent(By.id('password'));
  const userNameWE = await driver.findElement(By.id('username'), 1000);
  const passwordWE = await driver.findElement(By.id('password'), 1000);

  userNameWE.sendKeys(credens.name);
  passwordWE.sendKeys(credens.password);

  console.log('Credenciales introducidas');

  const loginBy = By.id('kc-login');

  click(loginBy);

  console.log('Botón login apretado');

  clickEnAdministrarAsistencias();
}

async function waitTillByPresent(by) {
  driver.wait(until.elementLocated(by), 10000);
}

async function click(by) {
  const elem = await driver.findElement(by, 1000);
  elem.click();
}

async function clickEnAdministrarAsistencias() {
  // click en administrar asistencias/asistencias
  const administrarCSSSelector =
    'body > header > nav > ul.o_menu_sections > li:nth-child(3) > a';

  console.log('before wait');

  const administrarPresente = driver.wait(
    until.elementLocated(By.linkText('Administrar asistencias')),
    10000
  );
    
    administrarPresente.then( function clicka(){

        const administrarBy = By.css(administrarCSSSelector);
        waitTillByPresent(By.css(administrarBy));
      
        //clicando en administrar asistencias
        click(administrarBy);
    });



  // click en /asistencias
  const asistenciasXpathSelector =
    '/html/body/header/nav/ul[2]/li[3]/div/a/span';
  waitTillByPresent(By.xpath(asistenciasXpathSelector));
  await driver.findElement(By.xpath(asistenciasXpathSelector), 1000).click();

  waitTillByPresent(By.css('body > div.o_main.o_chatter_position_normal > main > div.o_content > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)'));
  // JAVA
}

exports.intranetLogin = intranetLogin;
