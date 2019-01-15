export declare var ChatContainer: any;
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
