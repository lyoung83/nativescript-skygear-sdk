export declare var ChatContainer: any;
export declare class Chat {
    private chat;
    constructor(skygear: any);
    getChat(): any;
    createDirectConversation(userId: string, title?: string): void;
    createGroupConversation(userIds: string[], title?: string): void;
    sendMessage(message: string, conversationId: string): void;
    fetchCurrentConversations(): void;
    fetchMessages(conversationId: string): void;
    leaveConversation(conversationId: string): void;
}
