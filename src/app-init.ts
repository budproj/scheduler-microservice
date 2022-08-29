import { connect as connectNats } from './infrastructure/nats';
import {
  connect as connectAgenda,
  enableGracefulShutdown,
} from './infrastructure/agenda';
import { healthCheckController } from './nats.controller';

export const initalizeApplication = async () => {
  // Agenda
  await connectAgenda();
  enableGracefulShutdown();

  // NATS
  await connectNats();

  // Controllers
  healthCheckController();
};
