import { logger } from '../infrastructure/logger';
import {
  define,
  Job,
  cancelJobs,
  createAndRepeat,
  GenericSchedulerInput,
} from '../infrastructure/agenda';
import { publish } from '../infrastructure/messaging';

export interface ProcessRoutineData extends GenericSchedulerInput {
  id: string;
  companyId: string;
  disabledTeams: string[];
}

export const init = () => {
  define(
    'processRoutine',
    async (job: Job<ProcessRoutineData & { queue: string }>): Promise<void> => {
      logger.info('processing routine', job.attrs.data);

      const { queue, ...jobData } = job.attrs.data;
      const data = jobData;

      await publish(queue, data);
    },
  );
};

export const scheduleRoutine = (when: string, data: ProcessRoutineData) =>
  createAndRepeat('processRoutine', when, data);

export const removeRoutine = (identifier: string) =>
  cancelJobs({
    name: 'processRoutine',
    'data.uniqueIdentifier': identifier,
  });
