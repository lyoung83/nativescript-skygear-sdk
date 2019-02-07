export declare const spawnWorker: () => any;
export declare class Cloud {
    private skygear;
    constructor(skygear: any);
    private createDictionary(object);
    callLambda(name: any, args?: {}): Promise<any>;
}
