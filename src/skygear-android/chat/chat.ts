declare var io: any;
import { ios, } from "tns-core-modules/utils/utils";
import { SKYSaveCallback, SKYGetCallback, SKYGetCollectionCallback, SKYLambdaCallback } from "./chat-handlers";
export var ChatContainer = io.skygear.plugins.chat.ChatContainer;


export class Chat {
    private chat;
    constructor(skygear) {
        this.chat = ChatContainer.getInstance(skygear);
        console.log(this.chat)
    }

    private response(worker: Worker) {
        return new Promise<any>((resolve, reject) => {
            worker.onmessage = (msg) => {
                if (msg.data.res === "success") {
                    resolve(msg.data.result);
                } else {
                    reject(msg.data.error);
                }
                worker.terminate();
            }
        })
    }

    private sliceId(id: string) {
        let uuid = id.split("/")
        if (uuid.length === 1) {
            return uuid[0]
        } else {
            return uuid[1]
        }
    }

    getChat() {
        return this.chat;
    }

    async createDirectConversation(userId: string, title = "") {
        try {
            console.log(userId);
            let saveCallback = new SKYSaveCallback();
            await this.chat.createDirectConversation(userId, title, null, saveCallback);
            return this.response(saveCallback.worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    async createGroupConversation(userIds: string[], title = "") {
        try {
            let saveCallback = new SKYGetCallback();
            let idArray = userIds.map(id => this.sliceId(id));
            let ids = ios.collections.jsArrayToNSArray(idArray)
            await this.chat.createConversation(ids, title, null, saveCallback);
            return this.response(saveCallback.worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    async sendMessage(message: string, conversationId: string) {
        try {
            let conversationCallback = new SKYGetCallback();
            await this.chat.getConversation(this.sliceId(conversationId), conversationCallback)
            let conversation = await this.response(conversationCallback.worker);
            let saveCallback = new SKYGetCallback();
            await this.chat.sendMessage(conversation, message, null, null, saveCallback);
            return this.response(saveCallback.worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    async fetchCurrentConversations() {
        try {
            let successCallback = new SKYGetCollectionCallback();
            await this.chat.getConversations(successCallback);
            return this.response(successCallback.worker)
        } catch ({ message: error }) {
            return { error }
        }
    }

    async fetchMessages(conversationId: string) {
        try {
            let saveCallback = new SKYGetCallback();
            await this.chat.getConversation(this.sliceId(conversationId), true, saveCallback)
            let conversation = await this.response(saveCallback.worker);
            let messagesCallback = new SKYGetCallback();
            await this.chat.getMessages(conversation, 50, null, messagesCallback)
            return this.response(messagesCallback.worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    async leaveConversation(conversationId: string) {
        try {
            let conversationCallback = new SKYGetCallback();
            await this.chat.getConversation(this.sliceId(conversationId), conversationCallback)
            let conversation = await this.response(conversationCallback.worker);
            let saveCallback = new SKYLambdaCallback();
            await this.chat.leaveConversation(conversation, saveCallback);
            return this.response(saveCallback.worker);
        } catch ({ message: error }) {
            return { error }
        }
    }
}