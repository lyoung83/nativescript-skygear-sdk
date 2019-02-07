declare var SKYChatExtension: any, SKYChatCacheController: any, SKYRecord: any, SKYConversation: any, SKYMessage: any;
import { ios } from "tns-core-modules/utils/utils";
import { serializeResult, serializeError } from "..";

export const spawnWorker = () => {
    if (global["TNS_WEBPACK"]) {
        const WebpackWorker = require("nativescript-worker-loader!../result-worker.js");
        return new WebpackWorker();
    } else {
        return new Worker('../result-worker.js');
    }
};

export class Chat {
    private chat;
    readonly conversationRecordType = "conversation";
    readonly messageRecordType = "message";
    constructor(skygear) {
        let chat = new SKYChatExtension();
        let cache = SKYChatCacheController.defaultController();
        this.chat = chat.initWithContainerCacheController(skygear, cache);
    }

    getChat() {
        return this.chat;
    }

    private async response(worker: Worker) {
        try {
            let result = await new Promise<any>((resolve) => {
                worker.onmessage = (msg) => {
                    if (msg.data.error) {
                        console.log(msg.data.error)
                        throw new Error("Chat Operation Error");
                    }
                    resolve(msg.data.result);
                    worker.terminate();
                }
            });
            return result;
        } catch ({ message: error }) {
            worker.terminate();
            return { error }
        }
    }

    private recordHandler(record) {
        if (record === null) {
            return {}
        }
        return record.record
    }

    private completionHandler = (worker: Worker) => (record, err: NSError) => {
        try {
            let r = this.recordHandler(record)
            let result: any = serializeResult(r.record);
            let error = serializeError(err);
            return worker.postMessage({ result, error });
        } catch ({ message: error }) {
            return { error }
        }
    }

    private arrayCompletionHandler = (worker: Worker) => (records, err) => {
        try {
            let newArray: any[] = ios.collections.nsArrayToJSArray(records);
            let result: any[] = newArray.map(item => serializeResult(item.record));
            let error = err ? serializeError(err) : null;
            return worker.postMessage({ result, error });
        } catch ({ message: error }) {
            return { error }
        }
    }

    private recordCompletionHandler = (worker: Worker) => (record, err) => {
        try {
            let result: any = record
            let error = serializeError(err);
            return worker.postMessage({ result, error });
        } catch ({ message: error }) {
            return { error }
        }
    }

    private createRecord(recordType, data) {
        let record = SKYRecord.recordWithRecordTypeName(recordType, this.sliceId(data._id))
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                record.setValueForKey(data[key], key);
            }
        }
        return record
    }

    private createEventData(event) {
        let record = serializeResult(event.record)
        let event_type;
        switch (event.event) {
            case 0:
                event_type = "create"
                break;
            case 1:
                event_type = "update"
                break;
            case 2:
                event_type = "delete"
                break;
            default:
                event_type = "invalid event"
                break;
        }

        return {
            record_type: event.recordType,
            event_type,
            record
        }
    }

    private sliceId(id: string) {
        let uuid = id.split("/")
        if (uuid.length === 1) {
            return uuid[0]
        } else {
            return uuid[1]
        }
    }
    /**
     * create a conversation with a single user.
     * @param userId {String}
     * @param title {String}
     */
    async createDirectConversation(userId: string, title: string = "") {
        try {
            let worker = spawnWorker();
            await this.chat
                .createDirectConversationWithParticipantIDTitleMetadataCompletion(
                    this.sliceId(userId), title, null, this.completionHandler(worker)
                );
            return this.response(worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    /**
     * create a conversation with several users.
     * @param userIds userIds of the users you want to start a conversation with
     * @param title title of this conversation
     */
    async createGroupConversation(userIds: string[], title: string = "") {
        try {
            let worker = spawnWorker();
            await this.chat
                .createDirectConversationWithParticipantIDsTitleMetadataCompletion(
                    userIds, title, null, this.completionHandler(worker)
                );
            return this.response(worker);
        } catch ({ message: error }) {
            return { error }
        }
    }
    /**
     * send a string message to a conversation.
     * @param message content of the message
     * @param conversationRecord entire conversation record to create native record representation
     */
    async sendMessage(message: string, conversationRecord) {
        try {
            let record = this.createRecord(this.conversationRecordType, conversationRecord);
            let conversation = await SKYConversation.alloc().initWithRecordData(record);
            let messageRecord = SKYRecord.recordWithRecordTypeName(this.messageRecordType, null);
            messageRecord.setValueForKey(message, "body");
            let skyMessage = SKYMessage.recordWithRecord(messageRecord);
            let worker = spawnWorker();
            await this.chat.addMessageToConversationCompletion(
                skyMessage, conversation, this.completionHandler(worker)
            );
            return this.response(worker);
        } catch ({ message: error }) {
            return { error }
        }
    }
    /**
     * fetch all conversations that the current user is involved in.
     */
    async fetchCurrentConversations() {
        try {
            let worker = await spawnWorker();
            await this.chat.fetchConversationsWithCompletion(this.arrayCompletionHandler(worker));
            return this.response(worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    /**
     * Fetch a single conversation that the current user is involved in.
     * @param conversationId the skygear id of the conversation.
     */
    async fetchConversation(conversationId: string) {
        try {
            let worker = await spawnWorker();
            await this.chat.fetchConversationWithConversationIDFetchLastMessageCompletion(this.sliceId(conversationId), false, this.recordCompletionHandler(worker));
            return this.response(worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    /**
     *  Fetch messages for a given conversation.
     * @param conversationId the skygear id of the conversation
     */
    async fetchMessages(conversationId: string) {
        try {
            let messageWorker = spawnWorker();
            await this.chat
                .fetchMessagesWithConversationIDLimitBeforeTimeOrderCompletion(
                    this.sliceId(conversationId), 50, null, null, this.arrayCompletionHandler(messageWorker)
                );
            return this.response(messageWorker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    /**
     * Allow the current user to leave a conversation.
     * @param conversationId the skygear id of the conversation
     */
    async leaveConversation(conversationId: string) {
        try {
            let worker = spawnWorker();
            await this.chat
                .leaveConversationWithConversationIDCompletion(this.sliceId(conversationId), this.completionHandler(worker));
            return this.response(worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    /**
     * subscribes to the user channel and relays all conversations and messages in conversations
     * @returns {Worker} worker
     */
    async subscribeToConversations() {
        try {
             await this.unsubscribeFromConversations()
            const RecordChangeEvent = "SKYChatDidReceiveRecordChangeNotification"
            let worker = spawnWorker();
            await this.chat
                .subscribeToUserChannelWithCompletion((error: NSError) => {
                    if (error) {

                        throw new Error(serializeError(error))
                    }
                });
            // allows for receiving messages from the backend but doesn't support hot swapping new users,
            // there may be something that I don't know about that would help with that.
            NSNotificationCenter.defaultCenter
                .addObserverForNameObjectQueueUsingBlock(
                    RecordChangeEvent,
                    this.chat,
                    NSOperationQueue.mainQueue, (note) => {
                        let recordChange = note.userInfo.objectForKey("recordChange")
                        let result = this.createEventData(recordChange);
                        worker.postMessage({ result })
                    })
            return worker;
        } catch ({ message: error }) {
            return { error }
        }
    }

    /**
     * Unsubscribe from the user channel
     */
    async unsubscribeFromConversations() {
        try {
            await this.chat.unsubscribeFromUserChannel()
            return "ok"
        } catch ({ message: error }) {
            return { error }
        }
    }
}