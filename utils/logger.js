import { createLogger, format, transports } from 'winston'
import { is_development } from '../configs/env_configs.js'

// Define log levels and colors
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
  },
};

// Create the logger
const logger = createLogger({
  levels: customLevels.levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // Log to the console only in development
    is_development ? new transports.Console({
      format: format.combine(
        format.colorize(),
        format.cli(),
      ),
    }) : null,
    // Log to a file in all environments
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
    }),

    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.simple(),
      )
    }),
    
    new transports.File({
      filename: 'logs/combined.log',

    }),
  ].filter(Boolean), // Filter out null transports in case of non-development environment
});


export default logger;
