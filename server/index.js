const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { By, until } = require('selenium-webdriver');
let driver;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hola ${name}! ` }));
});

async function main(name, password) {
  const chrome = require('selenium-webdriver/chrome');
  const firefox = require('selenium-webdriver/firefox');
  const { Builder, By, Key, until } = require('selenium-webdriver');

  const screen = {
    width: 1800,
    height: 1000,
  };

  try {
    if (process.env.NODE_ENV === 'production') {
      driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless().windowSize(screen))
        .build();
    } else {
      driver = new Builder().forBrowser('chrome').build();
    }
  } catch (error) {
    console.log(error);
  }

  const finalizamos = false;

  var credens = { name: name, password: password };

  credens = await normalizeStrings(credens);

  console.log(credens.name);

  await intranetLogin(credens);

  try {
    const title = await driver.getTitle();
    console.log(title);
  } catch (ex) {
    console.log('Something went wrong', ex.message);
    driver.quit();
  } finally {
    // await driver.quit();
  }
}

async function normalizeStrings(credens) {
  if (credens.name.includes('estefan')) {
    console.log('es ella, dispara');
    credens.name = 'wtf';
    console.log(credens.name);

    return credens;
  }
  return credens;
}

app.get('/api/selenium', (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      console.log('ENVIRONMENT -> estamos en production');
    } else {
      console.log('ENVIRONMENT -> estamos en dev');
    }

    const name = req.query.name || 'jesus.delalama@altia.es';
    const password = req.query.password || 'eMP6?hb]';

    console.log('has introducido : ' + name + ' ' + password);

    main(name, password).catch(console.error);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

async function intranetLogin(credens) {
  driver.get('https://intrabox.altia.es');

  console.log('Introduciendo credenciales');
  //login
  waitTillByPresent(By.id('username'));
  waitTillByPresent(By.id('password'));
  const userNameWE = await driver.findElement(By.id('username'), 1000);
  const passwordWE = await driver.findElement(By.id('password'), 1000);

  try {
    // fill
    userNameWE.sendKeys(credens.name);
    passwordWE.sendKeys(credens.password);

    console.log('Credenciales introducidas');

    const loginBy = By.id('kc-login');

    console.log('Botón login apretado');

    click(loginBy);
  } catch (ex) {
    console.log('Something went wrong', ex.message);
  }
}

async function waitTillByPresent(by) {
  driver.wait(until.elementLocated(by), 5000);
}

async function click(by) {
  const elem = await driver.findElement(by, 1000);
  elem.click();
}
