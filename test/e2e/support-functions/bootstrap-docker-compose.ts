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
    .withWaitStrategy(
      'nats',
      waitForText('Listening for client connections on 0.0.0.0:4222'),
    )
    .withWaitStrategy('scheduler', waitForText('App Running'))
    .withBuild()
    .up();

  await setTimeout(30_000);

  const natsContainer = dockerComposeEnvironment.getContainer('nats');

  global.__nats__ = {
    host: natsContainer.getHost(),
    port: natsContainer.getMappedPort(4222),
  };
};

export const tearDownDockerCompose = async () => {
  await dockerComposeEnvironment.down();
  await dockerComposeEnvironment.stop();
};
