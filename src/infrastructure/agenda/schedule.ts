import { logger } from '../logger';
import { getSingleton } from './singleton';

export const schedule = async (
  jobToRun: string,
  cron: string,
  data: unknown,
): Promise<void> => {
  const job = await getSingleton()
    .create(jobToRun, data)
    .repeatEvery(cron)
    .save();

  logger.info('Created job', job.toJSON());
};
