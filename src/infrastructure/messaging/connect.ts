import { Connection } from 'rabbitmq-client';
import { logger } from '../logger';
import { setSingleton } from './singleton';

const { RABBITMQ_CONNECTION_STRING } = process.env;

export const connect = async (): Promise<void> => {
  const connection = new Connection({ url: RABBITMQ_CONNECTION_STRING });

  const channel = await connection.acquire();
  logger.info('Connected to RabbitMQ');

  setSingleton(connection, channel);
};
