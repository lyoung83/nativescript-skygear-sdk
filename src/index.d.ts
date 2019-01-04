import { Common, iSkyConfig } from './skygear-sdk.common';
import { Auth, Database } from './skygear-ios';

export interface iSkyRecord {
    recordType: string;
}

export declare class SkygearSdk extends Common {
    skygear: any;
    db: Database;
    auth: Auth;
    constructor(config: iSkyConfig);
    getContainer(): any;
}