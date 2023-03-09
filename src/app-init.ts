import { connect as connectMessaging } from './infrastructure/messaging';
import {
  connect as connectAgenda,
  enableGracefulShutdown,
} from './infrastructure/agenda';
import { init as processRoutineInit } from './jobs/process-routine';
import { subscriptionsController } from './nats.controller';
import { logger } from './infrastructure/logger';

export const initalizeApplication = async () => {
  // Agenda
  await connectAgenda();
  enableGracefulShutdown();
  processRoutineInit();

  // Messaging
  await connectMessaging();

  // Controllers
  subscriptionsController();
  logger.info('Microservice is running');
};
