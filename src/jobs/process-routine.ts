import { define, Job, schedule } from 'src/infrastructure/agenda';

export interface processRoutineData {
  routineId: string;
}

define('processRoutine', (job: Job<processRoutineData>) => {
  const { routineId } = job.attrs.data;

  console.log(routineId);
});

export const scheduleRoutine = (when: string | Date, data: any) =>
  schedule(when, 'processRoutine', data);