import { logger } from '../infrastructure/logger';
import { define, Job, schedule, cancelJobs } from '../infrastructure/agenda';
import { encode, publish } from '../infrastructure/nats';

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
    (job: Job<processRoutineData & { queue: string }>): void => {
      logger.info('processing routine', job);

      const { queue, ...jobData } = job.attrs.data;
      const data = encode<processRoutineData>(jobData);

      return publish(queue, data);
    },
  );
};

export const scheduleRoutine = (when: string, data: unknown) =>
  schedule('processRoutine', when, data);

export const removeRoutine = (data: removeRoutineData) =>
  cancelJobs<removeRoutineData>({
    name: 'processRoutine',
    'data.companyId': data.companyId,
    'data.queue': data.queue,
  });
