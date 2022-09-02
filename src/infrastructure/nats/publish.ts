import { getSingleton } from './singleton';

export const publish = (subject: string, data: Uint8Array) =>
  getSingleton().publish(subject, data);
