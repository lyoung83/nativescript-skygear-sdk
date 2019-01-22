import { Observable } from "tns-core-modules/data/observable/observable";
import { SkygearSdk } from "nativescript-skygear-sdk";

export class ConversationPage extends Observable {
    private chat: any;
    conversations: any;
    constructor(skygear: SkygearSdk) {
        super();
        this.chat = skygear.chat;

        this.chat.fetchCurrentConversations()
        .then(conversations => this.set("conversations", conversations));
    }
}