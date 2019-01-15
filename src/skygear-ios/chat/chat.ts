declare var SKYChatExtension: any, SKYChatCacheController: any;
import * as utils from "tns-core-modules/utils/utils";
import { serializeResult, serializeError } from "..";

export class Chat {
    private chat;
    constructor(skygear) {
        let chat = new SKYChatExtension();
        let cache = SKYChatCacheController.defaultController();
        this.chat = chat.initWithContainerCacheController(skygear, cache);
        console.log(this.chat);
    }

    getChat() {
        return this.chat;
    }

    private async response(worker: Worker) {
        try {
            let result = await new Promise((resolve) => {
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

    private spawnWorker() {
        return new Worker('../result-worker')
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
            let newArray: any[] = utils.ios.collections.nsArrayToJSArray(records);
            let result: any[] = newArray.map(item => serializeResult(item.record));
            let error = serializeError(err);
            return worker.postMessage({ result, error });
        } catch ({ message: error }) {
            return { error }
        }


    }

    async createDirectConversation(userId: string, title: string = "") {
        try {
            let worker = this.spawnWorker();
            await this.chat
                .createDirectConversationWithParticipantIDTitleMetadataCompletion(
                    userId, title, null, this.completionHandler(worker)
                );
            return this.response(worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    async createGroupConversation(userIds: string[], title: string = "") {
        try {
            let worker = this.spawnWorker();
            await this.chat
                .createDirectConversationWithParticipantIDsTitleMetadataCompletion(
                    userIds, title, null, this.completionHandler(worker)
                );
            return this.response(worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    async sendMessage(message: string, conversationId: string) {
        try {
            var conversationWorker = this.spawnWorker()
            await this.chat.fetchConversationWithConversationIDFetchLastMessageCompletion(
                conversationId, false, this.completionHandler(conversationWorker)
            );
            let conversation = await this.response(conversationWorker);
            let worker = this.spawnWorker();
            await this.chat.addMessageToConversationCompletion(
                message, conversation, this.completionHandler(worker)
            );
            return this.response(worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    async fetchCurrentConversations() {
        try {
            let worker = this.spawnWorker();
            await this.chat.fetchConversationsWithCompletion(this.arrayCompletionHandler(worker));
            return this.response(worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    async fetchMessages(conversationId: string) {
        try {
            let worker = this.spawnWorker();
            await this.chat
                .fetchMessagesWithConversationIDLimitBeforeTimeOrderCompletion(
                    conversationId, 50, null, 'asc', this.arrayCompletionHandler(worker)
                );
            return this.response(worker);
        } catch ({ message: error }) {
            return { error }
        }
    }

    async leaveConversation(conversationId: string) {
        try {
            let worker = this.spawnWorker();
            await this.chat
                .leaveConversationWithConversationIDCompletion(conversationId, this.completionHandler(worker));
            return this.response(worker);
        } catch ({ message: error }) {
            return { error }
        }
    }
}