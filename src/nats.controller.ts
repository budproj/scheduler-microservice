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

    const scheduleConfiguration = decode<ScheduleInput>(msg.data);

    const { cron, ...data } = scheduleConfiguration;

    await scheduleRoutine(cron, data);
  });

  subscribe('deleteSchedule', async (error, msg) => {
    if (error) return console.error(error);

    const { routineId, companyId } = decode<ScheduleInput>(msg.data);
    const data = { routineId, companyId };

    await removeRoutine(data);
  });

  subscribe('updateSchedule', async (error, msg) => {
    if (error) return console.error(error);

    const scheduleConfiguration = decode<ScheduleInput>(msg.data);

    const { routineId, companyId } = scheduleConfiguration;
    await removeRoutine({ routineId, companyId });

    const { cron, ...addData } = scheduleConfiguration;
    await scheduleRoutine(cron, addData);
  });
};
