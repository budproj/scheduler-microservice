import { Job } from 'agenda';
import { getSingleton } from './singleton';

export const schedule = (
  when: string | Date,
  names: string,
  data: any,
): Promise<Job> => getSingleton().schedule(when, names, data);
