declare var io: any, org: any;
import { ios, } from "tns-core-modules/utils/utils";
import { SKYSaveCallback, SKYGetCallback, SKYGetCollectionCallback, SKYLambdaCallback, SKYGetMessagesCallback, SKYConversationSubscription } from "./chat-handlers";
export var ChatContainer = io.skygear.plugins.chat.ChatContainer;
export var Conversation = io.skygear.plugins.chat.Conversation;
export var Record = io.skygear.skygear.Record;
export var Serializer = io.skygear.skygear.RecordSerializer;
var JsonObject = org.json.JSONObject;
var JsonArray = org.json.JSONArray;
var Map = java.util.HashMap;
var Bool = java.lang.Boolean;

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
            }
        })
    }

    private createJson(object) {
        var json = new JsonObject();
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                var isArray = Array.isArray(object[key]);
                if (isArray) {
                    json.put(key, this.createArray(object[key]));
                } else if (typeof object[key] === "object" && !isArray) {
                    json.put(key, this.createJson(object[key]))
                } else {
                    json.put(key, object[key])
                }
            }
        }
        return json
    }


    private createArray(array) {
        var newArray;

        switch (typeof array[0]) {
            case "number":
                newArray = Array.create("int", array.length);
                break;
            case "string":
                newArray = Array.create(java.lang.String, array.length)
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
        return newArray
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
            await this.chat.createDirectConversation(userId, title, null, saveCallback);
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

    async sendMessage(message: string, conversationRecord) {
        try {
            let json = this.createJson(conversationRecord);
            let record = Serializer.deserialize(json); //not particularly thrilled about doing this.
            let javaRecord = Serializer.serialize(record); //seems really weird but trying to serialize the json into a record produces an error
            let cModel = Conversation.fromJson(javaRecord); //because of the way the access field is parsed. but I can de-serialize it and then serialize
            let saveCallback = new SKYSaveCallback();//and everyone is happy ¯\_(ツ)_/¯
            await this.chat.sendMessage(cModel, message, null, null, saveCallback);
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
            let getCallback = new SKYGetCallback();
            await this.chat.getConversation(this.sliceId(conversationId), getCallback)
            let conversation = await this.response(getCallback.worker);
            let json = this.createJson(conversation);
            let record = Serializer.deserialize(json)
            let javaRecord = Serializer.serialize(record);
            let cModel = Conversation.fromJson(javaRecord);
            let messagesCallback = new SKYGetMessagesCallback();
            await this.chat.getMessages(cModel, 50, null, null, messagesCallback)
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

    async subscribeToConversations() {
        try {
            let subscription = new SKYConversationSubscription()
            await this.chat.subscribeToConversation(subscription);
            return subscription.worker
        } catch ({ message: error }) {
            return { error }
        }
    }

    async unsubscribeFromConversations() {
        try {
            await this.chat.unsubscribeFromUserChannel()
            return "ok"
        } catch ({ message: error }) {
            return { error }
        }
    }
}