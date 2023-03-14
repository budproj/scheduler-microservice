import { Processor } from 'agenda';
import { getSingleton } from './singleton';

export const define = <T>(name: string, processor?: Processor<T>) =>
  getSingleton().define(name, processor);
