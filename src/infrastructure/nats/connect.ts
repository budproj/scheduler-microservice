import nats from 'nats';
import { setSingleton } from './singleton';

const { NATS_CONNECTION_STRING } = process.env;

export const connect = async (): Promise<void> => {
  const instance = await nats.connect({
    servers: NATS_CONNECTION_STRING,
  });

  setSingleton(instance);
};
