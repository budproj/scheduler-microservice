import { Agenda } from 'agenda';
import { setSingleton } from './singleton';
import { logger } from '../logger';

const { MONGODB_CONNECTION_STRING } = process.env;

export const computeMissingNextRuns = async (instance: Agenda): Promise<void> => {
  const jobs = await instance.jobs({ nextRunAt: null });

  logger.info(`Computing missing next runs for ${jobs.length} jobs`);

  for (const job of jobs) {
    logger.info('Computing missing next run for job', job.toJSON());
    await job.computeNextRunAt().save();
  }
}

export const connect = async (): Promise<void> => {
  const instance = new Agenda({ db: { address: MONGODB_CONNECTION_STRING } });
  await instance.start();

  await computeMissingNextRuns(instance);

  instance.on('ready', () => logger.info('Agenda is ready'));
  instance.on('error', (err) => logger.error('Agenda threw an error:', err));

  setSingleton(instance);
};
