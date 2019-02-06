export { Auth } from './auth/auth';
export { Database } from './database/database';
export { PubSub } from './pubsub/pubsub';
export { Chat } from './chat/chat';
export { Cloud } from './cloud/cloud';

export function spawnWorker(){
        if (global["TNS_WEBPACK"]) {
            const WebpackWorker = require("nativescript-worker-loader!./result-worker");
            return new WebpackWorker();
        } else {
            return new Worker('./result-worker');
        }
}