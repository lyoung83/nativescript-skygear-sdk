export declare class Chat {
    private chat;
    constructor(skygear: any);
    getChat(): any;
    private response(worker);
    private spawnWorker();
    private recordHandler(record);
    private completionHandler;
    private arrayCompletionHandler;
    createDirectConversation(userId: string, title?: string): Promise<{}>;
    createGroupConversation(userIds: string[], title?: string): Promise<{}>;
    sendMessage(message: string, conversationId: string): Promise<{}>;
    fetchCurrentConversations(): Promise<{}>;
    fetchMessages(conversationId: string): Promise<{}>;
    leaveConversation(conversationId: string): Promise<{}>;
}
