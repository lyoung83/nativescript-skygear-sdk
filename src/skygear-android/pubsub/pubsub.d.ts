export declare var SKYPubsubHandler: any;
export declare class PubSubResponse extends SKYPubsubHandler {
    handle(data: any): void;
}
export declare class PubSub {
    private channel;
    constructor(skygear: any);
    private response();
    private createMap(payloadObject);
    private createArray(array);
    private createPayload(payload);
    subscribe(channelName: string): Promise<{}>;
    publish(channelName: string, payload: any): Promise<any>;
}
