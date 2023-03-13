import { join as pathJoin } from 'node:path';
import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
  Wait,
} from 'testcontainers';
import { setTimeout } from 'timers/promises';

const composeFilePath = pathJoin(process.env.PWD, 'test');
const waitForText = Wait.forLogMessage;

let dockerComposeEnvironment: StartedDockerComposeEnvironment;

export const bootstrapDockerCompose = async () => {
  dockerComposeEnvironment = await new DockerComposeEnvironment(
    composeFilePath,
    'e2e.docker-compose.yml',
  )
    .withWaitStrategy('rabbitmq', waitForText('Server startup complete'))
    .withWaitStrategy('mongo', waitForText('Waiting for connections'))
    .withWaitStrategy('scheduler', waitForText('Microservice is running'))
    .withBuild()
    .up();

  await setTimeout(30_000);

  const rabbitmqContainer = dockerComposeEnvironment.getContainer('rabbitmq');

  global.__rabbitmq__ = {
    host: rabbitmqContainer.getHost(),
    port: rabbitmqContainer.getMappedPort(5672),
  };
};

export const tearDownDockerCompose = async () => {
  await dockerComposeEnvironment.down();
  await dockerComposeEnvironment.stop();
};
