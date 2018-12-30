import { Common, iSkyConfig } from './skygear-sdk.common';
export declare class SkygearSdk extends Common {
    skygear: any;
    private authInfo;
    constructor(config: iSkyConfig);
    resultFunc(result: any, err: any): Promise<any>;
    getContainer(): any;
    signupWithUsername(username: string, password: string): Promise<any>;
    signupWithEmail(email: string, password: string): Promise<any>;
    loginWithUsername(username: string, password: string): Promise<any>;
    loginWithEmail(email: string, password: string): Promise<any>;
}
