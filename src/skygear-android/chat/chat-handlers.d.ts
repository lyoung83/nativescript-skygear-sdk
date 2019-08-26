export declare const spawnWorker: () => any;
export declare const GetCallback: any;
export declare const LambdaCallback: any;
export declare const SaveCallback: any;
export declare const Serializer: any;
export declare const GetMessagesCallback: any;
export declare const ConversationSubscriptionCallback: any;
export declare const UserSubscriptionCallback: any;
declare const SKYSaveCallback_base: new () => any;
export declare class SKYSaveCallback extends SKYSaveCallback_base {
    resolve: any;
    reject: any;
    constructor(res: any, rej: any);
    onSuccess(object: any): void;
    onFail(error: any): void;
}
declare const SKYGetCallback_base: new () => any;
export declare class SKYGetCallback extends SKYGetCallback_base {
    resolve: any;
    reject: any;
    constructor(res: any, rej: any);
    onSuccess(object: any): void;
    onGetCachedResult(object: any): void;
    onFail(err: any): void;
}
declare const SKYGetCollectionCallback_base: new () => any;
export declare class SKYGetCollectionCallback extends SKYGetCollectionCallback_base {
    resolve: any;
    reject: any;
    constructor(res: any, rej: any);
    onSuccess(object: any): void;
    onGetCachedResult(object: any): void;
    onFail(err: any): void;
}
declare const SKYLambdaCallback_base: new () => any;
export declare class SKYLambdaCallback extends SKYLambdaCallback_base {
    resolve: any;
    reject: any;
    constructor(res: any, rej: any);
    onLambdaSuccess(object: any): void;
    onLambdaFail(err: any): void;
}
declare const SKYGetMessagesCallback_base: new () => any;
export declare class SKYGetMessagesCallback extends SKYGetMessagesCallback_base {
    resolve: any;
    reject: any;
    constructor(res: any, rej: any);
    onSuccess(object: any): void;
    onGetCachedResult(object: any): void;
    onFail(err: any): void;
}
export declare class SKYConversationSubscription extends ConversationSubscriptionCallback {
    worker: Worker;
    supportingEventTypes(): any;
    notify(event: string, conversation: any): void;
}
export declare class SKYUserSubscription extends UserSubscriptionCallback {
    worker: Worker;
    supportingEventTypes(): any;
    notify(_: string, data: any): void;
}
