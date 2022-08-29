import { connect, NatsConnection, JSONCodec } from 'nats';
import { util } from 'prettier';
import { getNatsConnectionString } from './support-functions/generate-connection-strings';
import { setTimeout } from 'timers/promises';

describe('NATS Health Check', () => {
  jest.setTimeout(120_000);

  let natsConnection: NatsConnection;
  const jsonCodec = JSONCodec<any>();

  beforeAll(async () => {
    const natsConnectionString = getNatsConnectionString(global.__nats__);
    natsConnection = await connect({ servers: natsConnectionString });
  });

  afterAll(async () => {
    await natsConnection.drain();
    await natsConnection.close();
  });

  it('should receive true as response on health check queue', async () => {
    await setTimeout(5_000); // TODO: healthcheck on docker-compose to the worker to wait until it has started

    // Arrange
    const queue = 'scheduler:health-check';
    const payload = jsonCodec.encode('ping');

    //Act
    const result = await natsConnection.request(queue, payload);

    //Assert
    const response = jsonCodec.decode(result.data);
    expect(response).toBe('pong');
  });
});
