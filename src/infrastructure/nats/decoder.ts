import { JSONCodec } from 'nats';

export const encode = <T>(data: T): Uint8Array => {
  const codec = JSONCodec<T>();

  return codec.encode(data);
} 

export const decode = <T>(data: Uint8Array): T => {
  const codec = JSONCodec<T>();

  return codec.decode(data);
}