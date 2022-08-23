import { subscribe } from './infrastructure/nats';
import { scheduleRoutine } from './jobs/process-routine';

subscribe('health-check', async (err, msg) => {
  if (err) throw err;

  console.log('received message', msg);

  msg.respond(msg.data);
});
