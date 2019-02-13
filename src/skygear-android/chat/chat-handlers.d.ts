export declare const spawnWorker: () => any;
export declare const GetCallback: any;
export declare const LambdaCallback: any;
export declare const SaveCallback: any;
export declare const Serializer: any;
export declare const GetMessagesCallback: any;
export declare const ConversationSubscriptionCallback: any;
export declare const UserSubscriptionCallback: any;
export declare class SKYSaveCallback extends SaveCallback {
    worker: Worker;
    onSuccess(object: any): void;
    onFail(error: any): void;
}
export declare class SKYGetCallback extends GetCallback {
    worker: Worker;
    onSuccess(object: any): void;
    onGetCachedResult(object: any): void;
    onFail(err: any): void;
}
export declare class SKYGetCollectionCallback extends GetCallback {
    worker: Worker;
    onSuccess(object: any): void;
    onGetCachedResult(object: any): void;
    onFail(err: any): void;
}
export declare class SKYLambdaCallback extends LambdaCallback {
    worker: Worker;
    onLambdaSuccess(object: any): void;
    onLambdaFail(err: any): void;
}
export declare class SKYGetMessagesCallback extends GetMessagesCallback {
    worker: Worker;
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
