export declare const spawnWorker: () => any;
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
    createDirectConversation(userId: string, title?: string): Promise<{}>;
    createGroupConversation(userIds: string[], title?: string): Promise<{}>;
    sendMessage(message: string, conversationRecord: any): Promise<{}>;
    fetchCurrentConversations(): Promise<{}>;
    fetchConversation(conversationId: string): Promise<{}>;
    fetchMessages(conversationId: string): Promise<{}>;
    leaveConversation(conversationId: string): Promise<{}>;
    subscribeToConversations(): Promise<any>;
    unsubscribeFromConversations(): Promise<"ok" | {
        error: any;
    }>;
}
