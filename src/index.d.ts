import { Common, iSkyConfig } from './skygear-sdk.common';
import { Auth, Database, PubSub, Chat, Cloud } from './skygear-ios';

export interface iSkyRecord {
    _id?: any;
    _created_at?: any;
    _updated_at?: any;
    _created_by?: string;
    _updated_by?: string;
    _ownerID?: string;
    recordType: string;
  }

  export declare class SkygearSdk extends Common {
      private skygear;
      db: Database;
      auth: Auth;
      pubsub: PubSub;
      chat: Chat;
      cloud: Cloud;
      constructor({address, apiKey}: iSkyConfig);
      getContainer(): any;
  }
