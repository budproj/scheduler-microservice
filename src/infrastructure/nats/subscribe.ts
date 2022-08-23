import { Msg, NatsError } from 'nats';
import { getSingleton } from './singleton';

export const subscribe = (
  subject: string,
  callback: (err: NatsError, msg: Msg) => void,
) => getSingleton().subscribe(subject, { callback });
