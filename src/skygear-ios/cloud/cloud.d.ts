export declare class Cloud {
    private skygear;
    constructor(skygear: any);
    private createDictionary(object);
    private spawnWorker();
    callLambda(name: any, args?: {}): Promise<any>;
}
