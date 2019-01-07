export { Auth } from './auth/auth';
export { Database } from './database/database';
export { PubSub } from './pubsub/pubsub';

export var globalWorker = new Worker('./result-worker');