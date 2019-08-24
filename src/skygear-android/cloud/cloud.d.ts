export declare const spawnWorker: () => any;
export declare const LambdaCallback: any;
declare const SKYLambdaCallback_base: new () => any;
export declare class SKYLambdaCallback extends SKYLambdaCallback_base {
    private resolve;
    private reject;
    constructor(res: any, rej: any);
    onLambdaSuccess(object: any): void;
    onLambdaFail(err: any): void;
}
export declare class Cloud {
    private skygear;
    constructor(skygear: any);
    private createMap(object);
    callLambda(name: any, args?: {}): Promise<any>;
}
