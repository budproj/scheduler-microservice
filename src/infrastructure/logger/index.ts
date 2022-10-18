import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.simple(),
  defaultMeta: { service: 'scheduler' },
  transports: [
    new transports.Console({
      format: format.simple(),
    }),
  ],
});
