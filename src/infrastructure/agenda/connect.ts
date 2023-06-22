import { Agenda } from 'agenda';
import { setSingleton } from './singleton';
import { logger } from '../logger';

const { MONGODB_CONNECTION_STRING } = process.env;

export const connect = async (): Promise<void> => {
  const instance = new Agenda({ db: { address: MONGODB_CONNECTION_STRING } });
  await instance.start();

  // Debugging only
  if (logger.level === 'debug') {
    const jobs = await instance.jobs();
    logger.debug(`Got ${jobs.length} jobs at startup`);
    for (const job of jobs) {
      logger.debug(job.toJSON())
    }
  }

  instance.on('ready', () => logger.info('Agenda is ready'));
  instance.on('error', (err) => logger.error('Agenda threw an error:', err));

  setSingleton(instance);
};
