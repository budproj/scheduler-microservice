import { JSONCodec } from 'nats';

export const encode = <T>(data: T): Uint8Array => {
  const codec = JSONCodec<T>();

  return codec.encode(data);
};

export const decode = <T>(data: Uint8Array): { pattern: string; data: T } => {
  const codec = JSONCodec<{ pattern: string; data: T }>();

  return codec.decode(data);
};
