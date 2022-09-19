import { Job, JobAttributesData } from 'agenda';

export const repeatEvery = async (
  job: Job<JobAttributesData>,
  cron: string,
): Promise<Job<JobAttributesData>> => {
  return job
    .repeatEvery(cron, {
      skipImmediate: true,
    })
    .save();
};
