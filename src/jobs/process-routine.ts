import { define, Job, every, cancelJobs } from '../infrastructure/agenda';
import { encode, publish } from '../infrastructure/nats';

export interface processRoutineData {
  companyId: string;
  routineId: string;
  timestamp: Date;
  disabledTeams: string[];
}

export interface removeRoutineData {
  companyId: string;
  routineId: string;
}

export const init = () => {
  define('processRoutine', (job: Job<processRoutineData>): void => {
    const data = encode<processRoutineData>(job.attrs.data);

    return publish('deliveryRoutineNotification', data);
  });
};

export const scheduleRoutine = (when: string, data: any) =>
  every(when, 'processRoutine', data);

export const removeRoutine = (data: removeRoutineData) =>
  cancelJobs<removeRoutineData>({ name: 'processRoutine', ...data });
