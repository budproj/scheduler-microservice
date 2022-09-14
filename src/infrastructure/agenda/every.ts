import { Job } from 'agenda';
import { getSingleton } from './singleton';

export const every = (
  when: string,
  jobToRun: string,
  data: any,
): Promise<Job> => getSingleton().every(when, jobToRun, data);
