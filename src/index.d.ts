import { Common, iSkyConfig } from './skygear-sdk.common';
import { Auth, Database, PubSub } from './skygear-ios';

export interface iSkyRecord {
    recordType: string;
}

export declare class SkygearSdk extends Common {
    private skygear;
    db: Database;
    auth: Auth;
    pubsub: PubSub;
    constructor(config: iSkyConfig);
    getContainer(): any;
}