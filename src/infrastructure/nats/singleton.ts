import { NatsConnection } from 'nats';

let _natsConnectionSingleton: NatsConnection;

export const setSingleton = (instance: NatsConnection) => {
  _natsConnectionSingleton = instance;
};

export const getSingleton = () => _natsConnectionSingleton;
