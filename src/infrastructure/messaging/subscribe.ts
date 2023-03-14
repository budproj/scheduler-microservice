import {
  ConsumerHandler,
  Consumer,
  AsyncMessage,
  ReplyFN,
} from 'rabbitmq-client';
import { getSingleton } from './singleton';
import { logger } from '../logger';

const deafultQueueFeatures = {
  arguments: {
    'x-dead-letter-exchange': 'dead',
    'x-dead-letter-routing-key': 'dead',
  },
  durable: true,
};

/**
 * Direct subscribe to a queue.
 * @param queue the name of the queue to subscribe to
 * @param handler the function to process the message. Any error thrown will nack the msg.
 * @returns the consumer instance in case you need to handle it, but you probably should not
 */
export const subscribe = (
  queue: string,
  handler: ConsumerHandler,
): Consumer => {
  const consumer = getSingleton().createConsumer(
    {
      queue,
      qos: { prefetchCount: 1 },
      exchanges: [{ exchange: 'bud', type: 'topic', durable: true }],
      queueBindings: [{ exchange: 'bud', routingKey: queue }],
      queueOptions: deafultQueueFeatures,
    },
    (msg: AsyncMessage, reply: ReplyFN) => {
      const decodedMsg = {
        ...msg,
        body: JSON.parse(msg.body.toString()),
      };
      return handler(decodedMsg, reply);
    },
  );

  const defaultErrorHandler = (error) => {
    logger.error(`An error on ${queue} subscription was detected`, error);
  };

  consumer.on('error', defaultErrorHandler);

  logger.info(`Subscribed to RabbitMQ queue: ${queue}`);

  return consumer;
};
