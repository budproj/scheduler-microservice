import { connect as connectNats } from './infrastructure/nats';
import {
  connect as connectAgenda,
  enableGracefulShutdown,
} from './infrastructure/agenda';
import { init as processRoutineInit } from './jobs/process-routine';
import { healthCheckController } from './nats.controller';
import { logger } from './infrastructure/logger';

export const initalizeApplication = async () => {
  // Agenda
  await connectAgenda();
  enableGracefulShutdown();
  processRoutineInit();

  // NATS
  await connectNats();

  // Controllers
  healthCheckController();
  logger.info('Microservice is running');
};
