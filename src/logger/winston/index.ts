import { createLogger, format, transports } from 'winston';

const DEFAULT_LOG_LEVEL = 1;

const winstonLogLevels = {
  0: 'silent', // not really a winston log level, but works to make it silent :)
  1: 'error',
  2: 'warn',
  3: 'info',
};

const formatLevelLabel = format((info) => {
  info.level = `[${info.level.toUpperCase()}]`; // eslint-disable-line no-param-reassign
  return info;
});

export const formatOutput = ({ timestamp, level, message, stack, ...rest }) => {
  const baseMessage = `${timestamp} ${level} ${message.trim()}`;
  const stackMessage = stack ? `\n${stack}` : '';
  const additionalParamsMessage = Object.keys(rest).length
    ? `\n${JSON.stringify(rest, null, 2)}`
    : '';

  return `${baseMessage}${additionalParamsMessage}${stackMessage}`;
};

export const configureLogger = (appLogLevel) => {
  const winstonLogLevel =
    winstonLogLevels[appLogLevel] || winstonLogLevels[DEFAULT_LOG_LEVEL];

  const logger = createLogger();

  logger.configure({
    level: winstonLogLevel,
    format: format.combine(
      formatLevelLabel(),
      format.timestamp(),
      format.cli(),
      format.printf(formatOutput),
    ),
    transports: [new transports.Console()],
  });

  return logger;
};

const logger = configureLogger(3);
export default logger;
