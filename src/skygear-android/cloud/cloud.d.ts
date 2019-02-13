export declare const spawnWorker: () => any;
export declare const LambdaCallback: any;
export declare class SKYLambdaCallback extends LambdaCallback {
    worker: Worker;
    onLambdaSuccess(object: any): void;
    onLambdaFail(err: any): void;
}
export declare class Cloud {
    private skygear;
    constructor(skygear: any);
    private createMap(object);
    callLambda(name: any, args?: {}): Promise<any>;
}
