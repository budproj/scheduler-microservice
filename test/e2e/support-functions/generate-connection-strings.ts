export interface Env {
  host: string;
  port: number;
}

export const getNatsConnectionString = (postgresEnv: Env) =>
  `nats://${postgresEnv.host}:${postgresEnv.port}`;
