declare var SKYChatExtension: any, SKYChatCacheController: any;
import * as utils from "tns-core-modules/utils/utils";

var chatWorker = new Worker('../result-worker');

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

    private async response() {
        try {
            let result = await new Promise((resolve) => {
                chatWorker.onmessage = (msg) => {
                    if (msg.data.error) {
                        console.log(msg.data.error)
                        throw new Error("Chat Operation Error");
                    }

                    resolve(msg.data.result);
                    return;
                }
            });
            return result;
        } catch ({ message: error }) {
            return { error }
        }
    }

    async createDirectConversation(userId: string, title: string = "") {
        try {
            await this.chat
                .createDirectConversationWithParticipantIDTitleMetadataCompletion(userId, title, null, (conversation, error) => {
                    console.log(conversation)
                    chatWorker.postMessage({ result: conversation, error });
                })
            return this.response();
        } catch ({ message: error }) {
            return { error }
        }
    }

    async createGroupConversation(userIds: string[], title: string = "") {
        try {
            await this.chat
                .createDirectConversationWithParticipantIDsTitleMetadataCompletion(userIds, title, null, (conversation, error) => {
                    console.log(conversation)
                    chatWorker.postMessage({ result: conversation, error });
                })
            return this.response();
        } catch ({ message: error }) {
            return { error }
        }
    }

    async sendMessage(message: string, conversationId: string) {
        try {
            var worker = new Worker('../result-worker');
            await this.chat.fetchConversationWithConversationIDFetchLastMessageCompletion(conversationId, false, (result, error) => {
                worker.postMessage({ result, error });
            });

            var conversation = await new Promise((resolve, reject) => {
                worker.onmessage = (msg) => {
                    try {
                        if (msg.data.res === "fail") {
                            throw new Error("Error Fetching Conversation");
                        }
                        resolve(msg.data.result);

                    } catch ({ message: error }) {
                        reject({ error })
                    }

                };
            });

            await this.chat.addMessageToConversationCompletion(message, conversation, (result, error) => {
                chatWorker.postMessage({ result, error });
            });
            return this.response();
        } catch ({ message: error }) {
            return { error }
        }
    }

    async fetchCurrentConversations() {
        try {
            await this.chat.fetchConversationsWithCompletion((result, error) => {
                chatWorker.postMessage({ result, error });
            });
            return this.response();
        } catch ({ message: error }) {
            return { error }
        }
    }

    async fetchMessages(conversationId: string) {
        try {
            await this.chat
                .fetchMessagesWithConversationIDLimitBeforeTimeOrderCompletion(conversationId, 50,
                    null, 'asc', (result, error) => {
                        chatWorker.postMessage({ result, error })
                    });
            return this.response();
        } catch ({ message: error }) {
            return { error }
        }
    }

    async leaveConversation(conversationId: string) {
        try {
            await this.chat
                .leaveConversationWithConversationIDCompletion(conversationId, (result, error) => {
                    chatWorker.postMessage({ result, error })
                });
            return this.response();
        } catch ({ message: error }) {
            return { error }
        }
    }
}