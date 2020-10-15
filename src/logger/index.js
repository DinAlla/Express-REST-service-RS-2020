const { createLogger, format, transports } = require('winston');

const { combine, timestamp, errors, splat, json } = format;

const formatConfig = combine(
  timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  errors({ stack: true }),
  splat(),
  json()
);

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: formatConfig,
  transports: [
    new transports.Console({
      level: 'info'
    }),
    new transports.File({
      filename: 'logs/all.log',
      format: formatConfig
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: formatConfig
    })
  ]
});

module.exports = logger;
