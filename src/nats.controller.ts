import { subscribe, encode, decode } from './infrastructure/nats';
import { removeRoutine, scheduleRoutine } from './jobs/process-routine';

interface ScheduleInput {
  id: string;
  queue: string;
  companyId: string;
  disabledTeams: string[];
  cron: string;
}

export const healthCheckController = () => {
  subscribe('scheduler:health-check', (error, msg) => {
    if (error) throw error;

    console.log('received message', decode(msg.data));

    const encodedResponse = encode('pong');
    return msg.respond(encodedResponse);
  });

  subscribe('createSchedule', async (error, msg) => {
    if (error) return console.error(error);

    const { data } = decode<ScheduleInput>(msg.data);
    const { cron, ...routine } = data;

    scheduleRoutine(cron, routine);
  });

  subscribe('deleteSchedule', async (error, msg) => {
    if (error) return console.error(error);

    const { data } = decode<ScheduleInput>(msg.data);
    const { id, companyId } = data;
    const routine = { id, companyId };

    await removeRoutine(routine);
  });

  subscribe('updateSchedule', async (error, msg) => {
    if (error) return console.error(error);

    const scheduleConfiguration = decode<ScheduleInput>(msg.data);

    const { data } = scheduleConfiguration;
    const { id, companyId, cron, ...restOfRoutine } = data;
    await removeRoutine({ id, companyId });

    const addData = { id, companyId, ...restOfRoutine };
    scheduleRoutine(cron, addData);
  });
};
