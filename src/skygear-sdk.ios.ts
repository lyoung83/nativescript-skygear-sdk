import { Common, ISkyConfig } from './skygear-sdk.common';
import { Auth, Database, PubSub, Chat, Cloud } from './skygear-ios';
declare var SKYContainer: any;

export class SkygearSdk extends Common {
    private skygear: any;
    public db: Database;
    public auth: Auth;
    public pubsub: PubSub;
    public chat: Chat;
    public cloud: Cloud;

    constructor({address, apiKey}: ISkyConfig) {
        super();

        this.skygear = new SKYContainer();
        this.skygear.configAddress(address);
        this.skygear.configureWithAPIKey(apiKey);

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
