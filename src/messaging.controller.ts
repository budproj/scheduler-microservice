import { subscribe } from './infrastructure/messaging';
import {
  ProcessRoutineData,
  removeRoutine,
  scheduleRoutine,
} from './jobs/process-routine';
import { logger } from './infrastructure/logger';
import { GenericSchedulerInput } from './infrastructure/agenda';

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

    const { data } = msg.body as ProcessRoutineData;
    const { cron } = data as ProcessRoutineData;

    scheduleRoutine(cron, data);
  });

  subscribe('scheduler-microservice:deleteSchedule', async (msg) => {
    logger.info('received a deleteSchedule message');

    const { data } = msg.body;
    const { uniqueIdentifier } = data as GenericSchedulerInput;

    await removeRoutine(uniqueIdentifier);
  });

  subscribe('scheduler-microservice:updateSchedule', async (msg) => {
    logger.info('received a updateSchedule message', msg.body);

    const scheduleConfiguration = msg.body as ProcessRoutineData;

    const { cron, uniqueIdentifier } = scheduleConfiguration;
    await removeRoutine(uniqueIdentifier);

    await scheduleRoutine(cron, scheduleConfiguration);
  });
};
