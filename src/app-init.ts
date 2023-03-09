import { connect as connectMessaging } from './infrastructure/messaging';
import {
  connect as connectAgenda,
  enableGracefulShutdown,
} from './infrastructure/agenda';
import { init as processRoutineInit } from './jobs/process-routine';
import { messagingController } from './messaging.controller';
import { logger } from './infrastructure/logger';

export const initalizeApplication = async () => {
  // Agenda
  await connectAgenda();
  enableGracefulShutdown();
  processRoutineInit();

  // Messaging
  await connectMessaging();

  // Controllers
  messagingController();
  logger.info('Microservice is running');
};
