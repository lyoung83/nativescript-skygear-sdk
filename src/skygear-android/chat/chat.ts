declare var io: any, org: any;
import { ios, } from "tns-core-modules/utils/utils";
import { SKYSaveCallback, SKYGetCallback, SKYGetCollectionCallback, SKYLambdaCallback, SKYGetMessagesCallback, SKYConversationSubscription } from "./chat-handlers";
export const ChatContainer = io.skygear.plugins.chat.ChatContainer;
export const Conversation = io.skygear.plugins.chat.Conversation;
export const Record = io.skygear.skygear.Record;
export const Serializer = io.skygear.skygear.RecordSerializer;
const JsonObject = org.json.JSONObject;
const JsonArray = org.json.JSONArray;
const Map = java.util.HashMap;
const Bool = java.lang.Boolean;

export class Chat {
    private chat;
    constructor(skygear) {
        this.chat = ChatContainer.getInstance(skygear);
    }

    private response(worker: Worker) {
        return new Promise<any>((resolve, reject) => {
            worker.onmessage = (msg) => {
                if (msg.data.res === "success") {
                    resolve(msg.data.result);
                    worker.terminate();
                } else {
                    reject(msg.data.result);
                    worker.terminate();
                }
            };
        });
    }

    private createJson(object) {
        const json = new JsonObject();
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const isArray = Array.isArray(object[key]);
                if (isArray) {
                    json.put(key, this.createArray(object[key]));
                } else if (typeof object[key] === "object" && !isArray) {
                    json.put(key, this.createJson(object[key]));
                } else {
                    json.put(key, object[key]);
                }
            }
        }
        return json;
    }


    private createArray(array) {
        let newArray;

        switch (typeof array[0]) {
            case "number":
                newArray = Array.create("int", array.length);
                break;
            case "string":
                newArray = Array.create(java.lang.String, array.length);
                break;
            case "object":
                newArray = new JsonArray();
                break;
            default:
                break;
        }

        array.forEach((item, index) => {
            if (typeof item === "object") {
                newArray.put(this.createJson(item));
                return;
            }
            newArray[index] = item;
        });
        return newArray;
    }

    private sliceId(id: string) {
        let uuid = id.split("/");
        if (uuid.length === 1) {
            return uuid[0];
        } else {
            return uuid[1];
        }
    }

    getChat() {
        return this.chat;
    }

    async createDirectConversation(userId: string, title = "") {
        try {
            return await new Promise((resolve, reject) => {
                let saveCallback = new SKYSaveCallback(resolve, reject);
                this.chat.createDirectConversation(userId, title, null, saveCallback);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    async createGroupConversation(userIds: string[], title = "") {
        try {
            return await new Promise((resolve, reject) => {
            let saveCallback = new SKYSaveCallback(resolve, reject);
            let idArray = userIds.map(id => this.sliceId(id));
            let ids = ios.collections.jsArrayToNSArray(idArray);
            this.chat.createConversation(ids, title, null, saveCallback);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    async sendMessage(message: string, conversationRecord) {
        try {
            return await new Promise((resolve, reject) => {
                let json = this.createJson(conversationRecord);
                let record = Serializer.deserialize(json); // not particularly thrilled about doing this.
                let javaRecord = Serializer.serialize(record); // seems really weird but trying to serialize the json into a record produces an error
                let cModel = Conversation.fromJson(javaRecord); // because of the way the access field is parsed. but I can de-serialize it and then serialize
                let saveCallback = new SKYSaveCallback(resolve, reject); // and everyone is happy ¯\_(ツ)_/¯
                this.chat.sendMessage(cModel, message, null, null, saveCallback);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    async fetchCurrentConversations() {
        try {
            return await new Promise((resolve, reject) => {
                let successCallback = new SKYGetCollectionCallback(resolve, reject);
                this.chat.getConversations(successCallback);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    async fetchMessages(conversationId: string) {
        try {
            return await new Promise(async (resolve, reject) => {
                let conversation = await new Promise((res, rej) => {
                    let getCallback = new SKYGetCallback(res, rej);
                    this.chat.getConversation(this.sliceId(conversationId), getCallback);
                })
                let json = this.createJson(conversation);
                let record = Serializer.deserialize(json);
                let javaRecord = Serializer.serialize(record);
                let cModel = Conversation.fromJson(javaRecord);
                let messagesCallback = new SKYGetMessagesCallback(resolve, reject);
                this.chat.getMessages(cModel, 50, null, null, messagesCallback);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    async leaveConversation(conversationId: string) {
        try {
            return await new Promise(async (resolve, reject) => {
            let conversation = await new Promise((res, rej) => {
                let conversationCallback = new SKYGetCallback(res, rej);
                this.chat.getConversation(this.sliceId(conversationId), conversationCallback);
            });
            let saveCallback = new SKYLambdaCallback(resolve, reject);
            this.chat.leaveConversation(conversation, saveCallback);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    async subscribeToConversations() {
        try {
            let subscription = new SKYConversationSubscription();
            await this.chat.subscribeToConversation(subscription);
            return subscription.worker;
        } catch ({ message: error }) {
            return { error };
        }
    }

    async unsubscribeFromConversations() {
        try {
            await this.chat.unsubscribeFromUserChannel();
            return "ok";
        } catch ({ message: error }) {
            return { error };
        }
    }
}