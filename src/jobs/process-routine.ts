import { define, Job, schedule, cancelJobs } from 'src/infrastructure/agenda';
import { encode, publish } from 'src/infrastructure/nats';

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

export const scheduleRoutine = (when: string | Date, data: any) =>
  schedule(when, 'processRoutine', data);

export const removeRoutine = (data: removeRoutineData) =>
  cancelJobs<removeRoutineData>({ name: 'processRoutine', ...data });
