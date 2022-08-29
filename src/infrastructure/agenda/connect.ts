import { Agenda } from 'agenda';
import { setSingleton } from './singleton';

const { MONGODB_CONNECTION_STRING } = process.env;

export const connect = async (): Promise<void> => {
  const instance = new Agenda({ db: { address: MONGODB_CONNECTION_STRING } });
  await instance.start();

  setSingleton(instance);
};
