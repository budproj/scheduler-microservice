import { subscribe } from './infrastructure/messaging';
import { removeRoutine, scheduleRoutine } from './jobs/process-routine';
import { logger } from './infrastructure/logger';

interface ScheduleInput {
  id: string;
  queue: string;
  companyId: string;
  disabledTeams: string[];
  cron: string;
}

export const messagingController = () => {
  subscribe('scheduler-microservice:health-check', (msg, reply) => {
    logger.info('received a healthcheck message');

    const data = JSON.parse(msg.body.toString('utf-8'));

    console.log('received message', data);

    const encodedResponse = 'pong';
    return reply(encodedResponse);
  });

  subscribe('scheduler-microservice:createSchedule', async (msg) => {
    logger.info('received a createSchedule message');

    const { data } = msg.body;
    const { cron, ...routine } = data as ScheduleInput;

    scheduleRoutine(cron, routine);
  });

  subscribe('scheduler-microservice:deleteSchedule', async (msg) => {
    logger.info('received a deleteSchedule message');

    const { data } = msg.body;
    const { queue, companyId } = data as ScheduleInput;
    const routine = { queue, companyId };

    await removeRoutine(routine);
  });

  subscribe('scheduler-microservice:updateSchedule', async (msg) => {
    logger.info('received a updateSchedule message', msg.body);

    const scheduleConfiguration = msg.body;

    const { cron, queue, companyId, ...restOfRoutine } =
      scheduleConfiguration as ScheduleInput;
    await removeRoutine({ queue, companyId });

    const newSchedule = { queue, companyId, ...restOfRoutine };
    await scheduleRoutine(cron, newSchedule);
  });
};
