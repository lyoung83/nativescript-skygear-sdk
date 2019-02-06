export declare class Chat {
    private chat;
    readonly conversationRecordType: string;
    readonly messageRecordType: string;
    constructor(skygear: any);
    getChat(): any;
    private response(worker);
    private recordHandler(record);
    private completionHandler;
    private arrayCompletionHandler;
    private recordCompletionHandler;
    private createRecord(recordType, data);
    private createEventData(event);
    private sliceId(id);
    createDirectConversation(userId: string, title?: string): Promise<any>;
    createGroupConversation(userIds: string[], title?: string): Promise<any>;
    sendMessage(message: string, conversationRecord: any): Promise<any>;
    fetchCurrentConversations(): Promise<any>;
    fetchConversation(conversationId: string): Promise<any>;
    fetchMessages(conversationId: string): Promise<any>;
    leaveConversation(conversationId: string): Promise<any>;
    subscribeToConversations(): Promise<any>;
    unsubscribeFromConversations(): Promise<"ok" | {
        error: any;
    }>;
}
