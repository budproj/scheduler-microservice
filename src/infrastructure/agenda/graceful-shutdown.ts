import { getSingleton } from './singleton';

async function graceful() {
  await getSingleton().stop();
  process.exit(0);
}

export const enableGracefulShutdown = () => {
  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);
};
