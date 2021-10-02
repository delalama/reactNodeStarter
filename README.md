# Working hours imputter


# Idea
Starter project to deploy fullstack projects on heroku

## Using this project

1. Clone the project, change into the directory and install the dependencies.

   ```bash
   git clone https://github.com/delalama/React-NodeStarter.git
   cd react-express-starter
   npm install
   ```

2. Create a `.env` file for environment variables in your server.

   ```bash
   touch .env
   ```

3. Start the server

   You can start the server on its own with the command:

   ```bash
   npm run server
   ```

   Run the React application on its own with the command:

   ```bash
   npm start
   ```

   Run both applications together with the command:

   ```bash
   npm run dev
   ```

   The React application will run on port 3000 and the server port 3001.


# Desplegar en heroku
https://stackoverflow.com/questions/58031466/how-to-run-selenium-webdriver-on-heroku-with-node-js-firefox-or-chrome


# APUNTES DEV...
- VARIABLES DE ENTORNO CREADA EN EL SCRIPT DEL PACKAGE genera variables globales para generar hilos
  console.log(process.env.NODE_ENV === 'production');

-  CROSSENV -> librería para settear variables globales en otros SO's


# script cerrar puerto
sudo kill -9 `sudo lsof -t -i:3000`