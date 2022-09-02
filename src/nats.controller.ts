import { subscribe, encode, decode } from './infrastructure/nats';
import { scheduleRoutine } from './jobs/process-routine';

interface ScheduleInput {
  companyId: string;
  routineId: string;
  timestamp: Date;
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

  subscribe('createSchedule', (error, msg) => {
    if (error) return console.error(error);

    const scheduleConfiguration = decode<ScheduleInput>(msg.data);

    const { cron, ...data } = scheduleConfiguration;

    scheduleRoutine(cron, data);
  });
};
