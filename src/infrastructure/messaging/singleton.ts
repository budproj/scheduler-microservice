import { Connection, Channel } from 'rabbitmq-client';

let _rabbitmqConnectionSingleton: Connection;
let _rabbitmqChannelSingleton: Channel;

export const setSingleton = (connection: Connection, channel: Channel) => {
  _rabbitmqConnectionSingleton = connection;
  _rabbitmqChannelSingleton = channel;
};

export const getSingleton = () => _rabbitmqConnectionSingleton;
export const getChannelSingleton = () => _rabbitmqChannelSingleton;
