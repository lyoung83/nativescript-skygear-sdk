export declare var ChatContainer: any;
export declare var Conversation: any;
export declare var Record: any;
export declare var Serializer: any;
export declare class Chat {
    private chat;
    constructor(skygear: any);
    private response(worker);
    private createJson(object);
    private createArray(array);
    private sliceId(id);
    getChat(): any;
    createDirectConversation(userId: string, title?: string): Promise<any>;
    createGroupConversation(userIds: string[], title?: string): Promise<any>;
    sendMessage(message: string, conversationRecord: any): Promise<any>;
    fetchCurrentConversations(): Promise<any>;
    fetchMessages(conversationId: string): Promise<any>;
    leaveConversation(conversationId: string): Promise<any>;
    subscribeToConversations(): Promise<Worker | {
        error: any;
    }>;
    unsubscribeFromConversations(): Promise<"ok" | {
        error: any;
    }>;
}
