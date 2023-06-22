import { logger } from '../infrastructure/logger';
import { define, Job, schedule, cancelJobs } from '../infrastructure/agenda';
import { publish } from '../infrastructure/messaging';

export interface processRoutineData {
  id: string;
  companyId: string;
  disabledTeams: string[];
}

export interface removeRoutineData {
  companyId: string;
  queue: string;
}

export const init = () => {
  define(
    'processRoutine',
    async (job: Job<processRoutineData & { queue: string }>): Promise<void> => {
      logger.info('processing routine', job.attrs.data);

      try {
        const { queue, ...jobData } = job.attrs.data;
        const data = jobData;

        await publish(queue, data);
      } catch (err) {
        logger.error('error processing routine', err);
        throw err;
      }
    },
  );
};

export const scheduleRoutine = async (when: string, data: unknown) => {
  logger.info(`scheduling routine with cron "${when}" and data`, data);
  return await schedule('processRoutine', when,  data);
}

export const removeRoutine = async (data: removeRoutineData) => {
  logger.info(`removing routine with data`, data);
  return await cancelJobs<removeRoutineData>({
    name: 'processRoutine',
    'data.companyId': data.companyId,
    'data.queue': data.queue,
  });
}
