import { Job, JobAttributesData } from 'agenda';
import { getSingleton } from './singleton';

export const create = async (
  jobToRun: string,
  data: any,
): Promise<Job<JobAttributesData>> => {
  return getSingleton().create(jobToRun, data).save();
};
