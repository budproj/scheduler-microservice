import { create } from './create';
import { repeatEvery } from './repeat-every';

export const schedule = async (
  jobToRun: string,
  cron: string,
  data: unknown,
): Promise<void> => {
  const job = await create(jobToRun, data);
  await repeatEvery(job, cron);
};
