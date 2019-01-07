export declare class PubSub {
    private channel;
    constructor(skygear: any);
    private response();
    private handler(info);
    subscribe(channelName: string): Promise<{}>;
    publish(channelName: string, payload: any): Promise<any>;
}
