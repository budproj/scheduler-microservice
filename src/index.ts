import { Agenda } from 'agenda';
import { connect } from 'nats';

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;
const natsConnectionString = process.env.NATS_CONNECTION_STRING;

const bootstrap = async () => {
  // Agenda
  const agenda = new Agenda({ db: { address: mongoConnectionString } });
  agenda.start();

  agenda.define('processRoutine', (job) => {
    const { routineId } = job.attrs.data;

    console.log(routineId);
  });

  agenda.schedule('in 5 seconds', 'processRoutine', { routineId: '1' });
  agenda.schedule('in 5 seconds', 'processRoutine', { routineId: '2' });
  agenda.schedule('in 5 seconds', 'processRoutine', { routineId: '3' });
  // ...

  // NATS
  const natsConnection = await connect({ servers: natsConnectionString });

  natsConnection.subscribe('health-check', {
    callback: (err, msg) => {
      if (err) throw err;

      console.log('received message', msg);
    },
  });
};

bootstrap();
