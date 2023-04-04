export { Job } from 'agenda';
export { define } from './define';
export { connect } from './connect';
export { enableGracefulShutdown } from './graceful-shutdown';
export { cancelJobs } from './cancel-jobs';
export { createAndRepeat } from './create-and-repeat';

export interface GenericSchedulerInput {
  uniqueIdentifier: string;
  queue: string;
  cron: string;
  [key: string]: any;
}
