require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

// const mysqlConnect = require('./db');
const userRoutes = require('./routes/users') //this includes userRoutes into the files
const sessionRoutes = require('./routes/session') //this includes session into the files
const blockRoutes = require('./routes/block') //this includes block into the files
const sitterRoutes = require('./routes/sitter') //this includes sitter into the files
const messageRoutes = require('./routes/message') //this includes message into the files
const sitterScheduleRoutes = require('./routes/sitterSchedule') //this includes sitter_schedule into the files
const parentScheduleRoutes = require('./routes/parentSchedule') //this includes parent_schedule into the files
const rateParentRoutes = require('./routes/rateParent') //this includes rate_parent into the files
const jobRoutes = require('./routes/job') //this includes job into the files


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
app.use('/block', authenticateJWT , blockRoutes); //this makes blockRoutes a route file
app.use('/sitter', authenticateJWT, sitterRoutes); //this makes sitterRoutes a route file
app.use('/sitter_schedule', authenticateJWT, sitterScheduleRoutes); //this makes sitterScheduleRoutes a route file
app.use('/parent_schedule', authenticateJWT, parentScheduleRoutes); //this makes parentScheduleRoutes a route file
app.use('/rate_parent', authenticateJWT, rateParentRoutes); //this makes rateParentRoutes a route file
app.use('/message',authenticateJWT, messageRoutes); //this makes messageRoutes a route file
app.use('/job', authenticateJWT, jobRoutes); //this makes jobRoutes a route file



// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
