import { Job, JobAttributesData } from 'agenda';
import { getSingleton } from './singleton';

export const createAndRepeat = async (
  jobToRun: string,
  cron: string,
  data: any,
): Promise<Job<JobAttributesData>> =>
  getSingleton()
    .create(jobToRun, data)
    .repeatEvery(cron, { skipImmediate: true })
    .save();
