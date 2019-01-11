declare var io:any, java: any;
export var ChatContainer = io.skygear.plugins.chat.ChatContainer;
export class Chat {
    private chat;
    constructor(skygear){
        this.chat = ChatContainer.getInstance(skygear);
        console.log(this.chat)
    }

    getChat(){
        return this.chat;
    }

    createDirectConversation(userId: string, title = ""){

    }

    createGroupConversation(userIds: string[], title = ""){

    }

    sendMessage(message:string, conversationId:string){

    }

    fetchCurrentConversations(){

    }

    fetchMessages(conversationId: string){

    }

    leaveConversation(conversationId: string){

    }
}