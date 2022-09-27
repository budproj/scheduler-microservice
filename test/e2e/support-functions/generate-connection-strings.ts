export interface Env {
  host: string;
  port: number;
}

export const getNatsConnectionString = (natsEnv: Env) =>
  `nats://${natsEnv.host}:${natsEnv.port}`;
