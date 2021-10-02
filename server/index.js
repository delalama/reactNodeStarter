const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { By, until } = require('selenium-webdriver');
const user = require('./functions/functions');
const userName = user.getName();
const funx = require('./functions/intranet');
const key = require('./functions/intranet');

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
      driver.manage().window().maximize();
    }
  } catch (error) {
    console.log(error);
  }

  const finalizamos = false;

  var credens = { name: name, password: password };

  credens = await normalizeStrings(credens);

  console.log(credens.name);

  await funx.intranetLogin(credens, driver);
  const administrar = await funx.aprietaLoginBtn(driver);
  const text = await funx.goToHours(driver, administrar);
  
  const hours = await funx.getHours(driver, text);

  console.log('pasa por aquí ?' + hours);
  console.log(hours);

  return hours;

}

async function normalizeStrings(credens) {
  if (credens.name.includes(key.value)) {
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


    console.log('nombre: ' + name);
    console.log('pass: ' + password);

    console.log('has introducido : ' + name + ' ' + password);

    const hours = main(name, password).catch(console.error);

    hours.then((elem) =>
      res.send(elem)
    );

  } catch (error) {
    console.error(error);
  }
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
