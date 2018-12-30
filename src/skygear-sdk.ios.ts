import { Common, iSkyConfig } from './skygear-sdk.common';
import { Auth } from './skygear-ios'
declare var SKYContainer: any;

export class SkygearSdk extends Common {
    public skygear: any;

    constructor(config: iSkyConfig) {
        super()
        this.skygear = new SKYContainer();
        this.skygear.configAddress(config.address);
        this.skygear.configureWithAPIKey(config.apiKey);
        this.auth = new Auth(this.skygear);
    }


    getContainer() {
        return this.skygear;
    }



}
