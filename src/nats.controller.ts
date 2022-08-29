import { subscribe, encode, decode } from './infrastructure/nats';

export const healthCheckController = () => {
  subscribe('scheduler:health-check', (error, msg) => {
    if (error) throw error;

    console.log('received message', decode(msg.data));

    const encodedResponse = encode('pong');
    return msg.respond(encodedResponse);
  });
};
