const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { By, Key, until } = require('selenium-webdriver');
const user = require('./functions/functions');
const userName = user.getName();
const intranetFunx = require('./functions/intranet');
const key = require('./functions/intranet');
const funx = require('./functions/functions');

let driver;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hola ${name}! ` }));
});

// intranet
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

  await intranetFunx.intranetLogin(credens, driver);
  const administrar = await intranetFunx.aprietaLoginBtn(driver);
  const text = await intranetFunx.goToHours(driver, administrar);

  const hours = await intranetFunx.getHours(driver, text);

  return hours;
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

    hours.then((elem) => {
      if (elem === null) {
        error('HA HABIDO UN ERROR');
      }
      res.send(elem);
    });
  } catch (error) {
    console.error(error);
  }
});

// caib imputation
async function caibImpute(imputeData, caibUser) {
  try {
    const ok = await caibImpute(imputeData, caibUser, driver);

    console.log(ok);

    driver.quit();

    return 'hola';
  } catch (error) {
    console.error(error);
  }
}

async function normalizeStrings(credens) {
  if (credens.name.includes(key.value)) {
    credens.name = 'wtf';
    console.log(credens.name);
    return credens;
  }
  return credens;
}

// config
app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const { text } = require('express');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server,
});

// Generates unique ID for every new connection
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + '-' + s4();
};

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];

const sendMessage = (json) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
};

const typesDef = {
  USER_EVENT: 'userevent',
  CONTENT_CHANGE: 'contentchange',
};

wsServer.on('request', function (request) {
  var userID = getUniqueID();
  console.log(
    new Date() +
      ' Recieved a new connection from origin ' +
      request.origin +
      '.'
  );
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(
    'connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients)
  );
  connection.on('message', function (message) {
    const jsonData = JSON.parse(message.utf8Data);

    if (jsonData.functionName === 'CAIBimput') {
      console.log('pasamos por CaibImput desde node');
      const caibUser = jsonData.caibUser;
      const imputeData = jsonData.imputeData;

      const propsToCaib = {
        driver,
        caibUser,
        imputeData,
      };

      caibImpute(propsToCaib);
    }

    // if (message.type === 'utf8') {
    //   const dataFromClient = JSON.parse(message.utf8Data);
    //   const json = { type: dataFromClient.type };
    //   if (dataFromClient.type === typesDef.USER_EVENT) {
    //     users[userID] = dataFromClient;
    //     userActivity.push(
    //       `${dataFromClient.username} joined to edit the document`
    //     );
    //     json.data = { users, userActivity };
    //   } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
    //     editorContent = dataFromClient.content;
    //     json.data = { editorContent, userActivity };
    //   }
    //   // console.log('utf 8', message);
    //   sendMessage(JSON.stringify(json));
    // } else {
    //   console.log('no utf 8', message);
    // }
  });

  // user disconnected
  connection.on('close', function (connection) {
    console.log(new Date() + ' Peer ' + userID + ' disconnected.');
    const json = { type: typesDef.USER_EVENT };
    userActivity.push(`${users[userID].username} left the document`);
    json.data = { users, userActivity };
    delete clients[userID];
    delete users[userID];
    sendMessage(JSON.stringify(json));
  });
});

async function caibImpute(props) {
  console.log('imprimimos props', props);
  console.log('estamos en CAIBIMPUTE()');

  const driver = props.driver;
  const caibUser = props.caibUser;

  const answers = [];

  const propis = {
    driver,
    caibUser,
    imputeData: props.imputeData[0],
  };

  for (var i = 0; i < 1; i++) {
    const answer = await eachImputation(propis);
    console.log(answer);
    answers.push(answer);
  }
  // props.imputeData.forEach((imputeData) => {
  //   const answer = await eachImputation(driver, caibUser, imputeData);
  //   console.log(answer);
  //   answers.push(answer);
  // });

  console.log('answers', answers);

  return answers;
}

async function eachImputation({ driver, caibUser, imputeData }) {
  console.log(caibUser);

  const answer = 'hola';

  const hourEnter = imputeData.horaEntrada;
  const hourExit = imputeData.horaSalida;
  const dateDay = imputeData.dia;
  const reason = imputeData.motivo;

  // navegar al CAIB
  const caibUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSfhn69UDNPybun0AVt-2hZoG3ScK0q2UpCjiNnvSgrRIfCg0A/viewform';
  driver.get(caibUrl);

  console.log('imputando fecha');

  const calendarXpathBy = By.xpath(
    '/html/body/div/div[2]/form/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/div[2]/div[1]/div/div[1]/input'
  );

  // clickando calendario
  console.log('clickando calendario');
  const calendar = await funx.waitWhatever(
    driver,
    '/html/body/div/div[2]/form/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/div[2]/div[1]/div/div[1]/input'
  );

  funx.wait(driver, calendarXpathBy);

  await calendar.sendKeys(Key.LEFT);
  await calendar.sendKeys(Key.LEFT);
  await calendar.sendKeys(dateDay);


  // click en altia consultores
  const ALTIA_CONSULTORES_OPTION_URL =
    '//*[@id="mG61Hd"]/div[2]/div/div[2]/div[3]/div/div/div[2]/div/div/span/div/div[2]';
  const altiaConsultoresRadioButtonSE = By.xpath(ALTIA_CONSULTORES_OPTION_URL);
  funx.wait(driver, altiaConsultoresRadioButtonSE);
  funx.click(driver, altiaConsultoresRadioButtonSE);

  // click en siguiente
  const siguienteSE = By.css('#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewNavigationNavControls > div.freebirdFormviewerViewNavigationButtonsAndProgress > div.freebirdFormviewerViewNavigationLeftButtons > div > span');
  funx.wait(driver, siguienteSE);
  funx.click(driver, siguienteSE);

  // sendMessage(JSON.stringify({ data: 'hola fondo sur!!' }));
  return texto;
}
