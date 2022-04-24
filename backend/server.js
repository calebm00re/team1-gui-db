require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');


const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');


// const mysqlConnect = require('./db');
const userRoutes = require('./routes/users') //this includes userRoutes into the files
const sessionRoutes = require('./routes/session') //this includes session into the files
const sitterRoutes = require('./routes/sitter') //this includes sitter into the files

//sets up middleware
const { authenticateJWT, authenticateWithClaims } = require('./middleware/auth');


// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

// specify middleware to use
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//include routes
//routes(app, logger);

app.use(sessionRoutes); //this incorperates session routes into express (the only routes which do not require authentication)
app.use('/users', authenticateJWT ,userRoutes); //this makes userRoutes a route file
app.use('/sitter', authenticateJWT, sitterRoutes); //this makes sitterRoutes a route file



// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
