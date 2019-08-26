export declare const ChatContainer: any;
export declare const Conversation: any;
export declare const Record: any;
export declare const Serializer: any;
export declare class Chat {
    private chat;
    constructor(skygear: any);
    private response(worker);
    private createJson(object);
    private createArray(array);
    private sliceId(id);
    getChat(): any;
    createDirectConversation(userId: string, title?: string): Promise<{}>;
    createGroupConversation(userIds: string[], title?: string): Promise<{}>;
    sendMessage(message: string, conversationRecord: any): Promise<{}>;
    fetchCurrentConversations(): Promise<{}>;
    fetchMessages(conversationId: string): Promise<{}>;
    leaveConversation(conversationId: string): Promise<{}>;
    subscribeToConversations(): Promise<Worker | {
        error: any;
    }>;
    unsubscribeFromConversations(): Promise<"ok" | {
        error: any;
    }>;
}
