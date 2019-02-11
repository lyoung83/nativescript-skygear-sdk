export declare const SKYPubsubHandler: any;
export declare class PubSubResponse extends SKYPubsubHandler {
    worker: Worker;
    handle(data: any): void;
}
export declare class PubSub {
    private channel;
    constructor(skygear: any);
    private response();
    private createMap(payloadObject);
    private createArray(array);
    private createPayload(payload);
    subscribe(channelName: string): Promise<Worker | {
        error: any;
    }>;
    publish(channelName: string, payload: any): Promise<any>;
}
