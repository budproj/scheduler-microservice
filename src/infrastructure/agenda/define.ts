import { DefineOptions, Processor } from 'agenda';
import { getSingleton } from './singleton';

export const define = (
  name: string,
  options: DefineOptions | Processor,
  processor?: Processor,
) => getSingleton().define(name, options, processor);
