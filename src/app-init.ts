import { connect as connectNats } from './infrastructure/nats';
import {
  connect as connectAgenda,
  enableGracefulShutdown,
} from './infrastructure/agenda';

export const initalizeApplication = async () => {
  // Agenda
  await connectAgenda();
  enableGracefulShutdown();

  // NATS
  await connectNats();
};
