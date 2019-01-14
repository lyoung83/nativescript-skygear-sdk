declare var io: any, java: any;
export var ChatContainer = io.skygear.plugins.chat.ChatContainer;
export var SaveCallback = io.skygear.plugins.chat;
export var LambdaCallback = io.skygear.skygear.LambdaResponseHandler;

import { ios } from "tns-core-modules/utils/utils";

export class SKYSaveCallback extends SaveCallback {
    worker: Worker = new Worker('../result-worker');

    onSuccess(object) {
        let result = JSON.parse(object);
        this.worker.postMessage({ result, error: null });
        return;
    }

    onGetCachedResult(object){
        let result = JSON.parse(object);
        this.worker.postMessage({result, error: null});
        return;
    }

    onFail(error) {
        this.worker.postMessage({ result: null, error });
        return;
    }
}

export class SKYLambdaCallback extends LambdaCallback {
    worker: Worker = new Worker('../result-worker');

    onLambdaSuccess(object) {
        let result = JSON.parse(object);
        this.worker.postMessage({ result, error: null });
        return;
    }

    onLambdaFail(error) {
        this.worker.postMessage({ result: null, error });
        return;
    }
}

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
            let saveCallback = new SKYSaveCallback();
            let id = this.sliceId(userId);
            await this.chat.createDirectConversation(id, title, null, saveCallback);
            return this.response(saveCallback.worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    async createGroupConversation(userIds: string[], title = "") {
        try {
            let saveCallback = new SKYSaveCallback();
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
            let conversationCallback = new SKYSaveCallback();
            await this.chat.getConversation(this.sliceId(conversationId), conversationCallback)
            let conversation = await this.response(conversationCallback.worker);
            let saveCallback = new SKYSaveCallback();
            await this.chat.sendMessage(conversation, message, null, null, saveCallback);
            return this.response(saveCallback.worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    async fetchCurrentConversations() {
        try {
            let successCallback = new SKYSaveCallback();
            await this.chat.getConversations(successCallback);
            return this.response(successCallback.worker)
        } catch ({ message: error }) {
            return { error }
        }
    }

    async fetchMessages(conversationId: string) {
        try {
            let saveCallback = new SKYSaveCallback();
            await this.chat.getConversation(this.sliceId(conversationId), true, saveCallback)
            let conversation = await this.response(saveCallback.worker);
            let messagesCallback = new SKYSaveCallback();
            await this.chat.getMessages(conversation, 50, null, messagesCallback)
            return this.response(messagesCallback.worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    async leaveConversation(conversationId: string) {
        try {
            let conversationCallback = new SKYSaveCallback();
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