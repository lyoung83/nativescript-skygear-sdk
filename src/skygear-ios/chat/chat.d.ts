export declare class Chat {
    private chat;
    readonly conversationRecordType: string;
    readonly messageRecordType: string;
    constructor(skygear: any);
    getChat(): any;
    private response(worker);
    private spawnWorker();
    private recordHandler(record);
    private completionHandler;
    private arrayCompletionHandler;
    private recordCompletionHandler;
    createEventData(event: any): {
        record_type: any;
        event_type: any;
        record: any;
    };
    private sliceId(id);
    createDirectConversation(userId: string, title?: string): Promise<any>;
    createGroupConversation(userIds: string[], title?: string): Promise<any>;
    sendMessage(message: string, conversationRecord: any): Promise<any>;
    fetchCurrentConversations(): Promise<any>;
    fetchConversation(conversationId: string): Promise<any>;
    fetchMessages(conversationId: string): Promise<any>;
    leaveConversation(conversationId: string): Promise<any>;
    subscribeToConversations(): Promise<Worker | {
        error: any;
    }>;
}
