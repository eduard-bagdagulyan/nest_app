import { addColors, createLogger, format, transports } from 'winston';

const { label, json, timestamp, align, printf } = format;

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7,
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow',
  },
};

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `{\n\tlabel: ${label},\n\ttimestamp: ${timestamp},\n\tlevel: ${level},\n\tmessage: ${message}\n},`;
});

const logger = createLogger({
  levels: config.levels,
  format: format.combine(
    label({ label: '🚩 Info!' }),
    json(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    align(),
    myFormat,
  ),
  defaultMeta: { service: 'Test Service' },
  transports: [
    new transports.Console({
      format: format.simple(),
    }),
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'logs/warn.log',
      level: 'warn',
    }),
    new transports.File({
      filename: 'logs/debug.log',
      level: 'debug',
    }),
    new transports.File({
      filename: 'logs/verbose.log',
      level: 'verbose',
    }),
  ],
});

addColors(config.colors);

export { logger };
