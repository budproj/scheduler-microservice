import { Filter } from 'mongodb';
import { getSingleton } from './singleton';

export const cancelJobs = <T>(query: Filter<T>) => getSingleton().cancel(query);
