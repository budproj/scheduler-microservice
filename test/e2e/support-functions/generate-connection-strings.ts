export interface Env {
  host: string;
  port: number;
}

export const getRabbitMQConnectionString = (rabbitMQEnv: Env) =>
  `amqp://guest:guest@${rabbitMQEnv.host}:${rabbitMQEnv.port}`;
