import { logger } from '../logger';
import { getChannelSingleton } from './singleton';

export const publish = async (subject: string, data: unknown) => {
  await getChannelSingleton().basicPublish({ routingKey: subject }, data);

  logger.info(`Published message to ${subject}`);
  logger.debug(`Content of message:`);
  logger.debug(data);
};
