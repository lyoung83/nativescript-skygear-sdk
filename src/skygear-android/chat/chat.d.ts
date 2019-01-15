export declare var ChatContainer: any;
export declare var GetCallback: any;
export declare var LambdaCallback: any;
export declare var SaveCallback: any;
export declare class SKYSaveCallback extends SaveCallback {
    onSuccess(object: any): void;
    onFail(error: any): void;
}
export declare class SKYGetCallback extends GetCallback {
    worker: Worker;
    onSuccess(object: any): void;
    onGetCachedResult(object: any): void;
    onFail(error: any): void;
}
export declare class SKYGetCollectionCallback extends GetCallback {
    worker: Worker;
    onSuccess(object: any): void;
    onGetCachedResult(object: any): void;
    onFail(error: any): void;
}
export declare class SKYLambdaCallback extends LambdaCallback {
    worker: Worker;
    onLambdaSuccess(object: any): void;
    onLambdaFail(error: any): void;
}
export declare class Chat {
    private chat;
    constructor(skygear: any);
    private response(worker);
    private sliceId(id);
    getChat(): any;
    createDirectConversation(userId: string, title?: string): Promise<any>;
    createGroupConversation(userIds: string[], title?: string): Promise<any>;
    sendMessage(message: string, conversationId: string): Promise<any>;
    fetchCurrentConversations(): Promise<any>;
    fetchMessages(conversationId: string): Promise<any>;
    leaveConversation(conversationId: string): Promise<any>;
}
