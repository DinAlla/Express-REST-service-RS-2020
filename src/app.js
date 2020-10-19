const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const logger = require('./logger');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

process.on('uncaughtException', err => {
  logger.error(`[Uncaught Exception] ${err.name}: ${err.message}`);
  logger.info('Shutting down...');
});

process.on('unhandledRejection', reason => {
  logger.error(`[Unhandled Rejection] ${reason}`);
});

process.on('NOT_FOUND', reason => {
  logger.error(`[Url not found] ${reason}`);
});

// Логирование всех запросов
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  const { method, url, body, params } = req;
  logger.info(
    `method=${method} url=${url} params=${JSON.stringify(
      params
    )} body=${JSON.stringify(body)}`
  );
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use('*', () => {
  throw new Error('Oops!');
});

// throw Error('Uncaught error');
// Promise.reject(Error('Oops, promise rejected!'));

// eslint-disable-next-line no-unreachable
module.exports = app;
