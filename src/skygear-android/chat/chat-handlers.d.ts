export declare var GetCallback: any;
export declare var LambdaCallback: any;
export declare var SaveCallback: any;
export declare var Serializer: any;
export declare var GetMessagesCallback: any;
export declare var ConversationSubscriptionCallback: any;
export declare var UserSubscriptionCallback: any;
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
