import { Common, iSkyConfig } from './skygear-sdk.common';
import { android } from 'tns-core-modules/application'
import { Auth, Database } from './skygear-android';

declare var io: any;
const Container = io.skygear.skygear.Container;
const Configuration = io.skygear.skygear.Configuration


export class SkygearSdk extends Common {
    private config;
    private skygear;
    public db: Database;
    public auth: Auth;

    constructor(skyConfig: iSkyConfig) {
        super();

        this.config = new Configuration.Builder()
            .endPoint(skyConfig.address)
            .apiKey(skyConfig.apiKey)
            .build();

        this.skygear = new Container(android.context, this.config);
        this.auth = new Auth(this.skygear);
        this.db = new Database(this.skygear)
    }



    getContainer() {
        return this.skygear;
    }


}
