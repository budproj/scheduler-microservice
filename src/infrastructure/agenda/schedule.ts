import { Job } from 'agenda';
import { getSingleton } from './singleton';

export const schedule = (
  when: string | Date,
  jobToRun: string,
  data: any,
): Promise<Job> => getSingleton().schedule(when, jobToRun, data);
