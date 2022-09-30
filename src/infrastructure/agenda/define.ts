import { Processor } from 'agenda';
import { getSingleton } from './singleton';

export const define = (name: string, processor?: Processor) =>
  getSingleton().define(name, processor);
