import { Common, iSkyConfig } from './skygear-sdk.common';
import { android } from 'tns-core-modules/application'
import { Auth, Database, PubSub, Chat, Cloud } from './skygear-android';

declare var io: any;
const Container = io.skygear.skygear.Container;
const Configuration = io.skygear.skygear.Configuration


export class SkygearSdk extends Common {
    private config;
    private skygear;
    public db: Database;
    public auth: Auth;
    public pubsub: PubSub
    public chat: Chat;
    public cloud: Cloud;

    constructor({address, apiKey}: iSkyConfig) {
        super();

        this.config = new Configuration.Builder()
            .endPoint(address)
            .apiKey(apiKey)
            .build();
        this.skygear = new Container(android.context, this.config);

        this.auth = new Auth(this.skygear);
        this.db = new Database(this.skygear);
        this.pubsub = new PubSub(this.skygear);
        this.chat = new Chat(this.skygear);
        this.cloud = new Cloud(this.skygear);
    }



    getContainer() {
        return this.skygear;
    }


}
