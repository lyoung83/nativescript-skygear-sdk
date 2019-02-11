import { Observable, EventData } from "tns-core-modules/ui/page/page";
import { SkygearSdk } from "nativescript-skygear-sdk";
import { prompt, action, ActionOptions } from "tns-core-modules/ui/dialogs/dialogs";
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view/list-view";

export class Messages extends Observable {
    messages;
    channel;

    constructor(private conversation: any, private skygear: SkygearSdk) {
        super();
        this.getMessages();
        this.subscribeToMessages();
    }

    sendMessage() {
        const promptOptions = {
            title: "Send Message",
            message: "type the messages you want to send",
            okButtonText: "Ok",
            cancelButtonText: "Cancel",
            defaultText: "hello",
            inputType: "text" // text, password, or email
        };

        prompt(promptOptions)
            .then(async result => {
                if (result.result) {
                    await this.skygear.chat.sendMessage(result.text, this.conversation);
                } else {
                    alert("Action Cancelled");
                }
            });
    }


    async getMessages() {
        try {
            let messages: any[] = await this.skygear.chat.fetchMessages(this.conversation._id);
            this.set("messages", messages.reverse());
        } catch {
            alert("Unable to fetch messages");
        }
    }

    async subscribeToMessages() {
        try {
            let subscription: any = await this.skygear.chat.subscribeToConversations();
            if (subscription.error) { throw new Error; }
            this.set("channel", subscription);
            subscription.onmessage = ({ data: { result } }) => {
                const {event_type, record_type, record} = result;
                if (event_type === "create" && record_type === "message" && record.conversation['$id'] === this.conversation._id) {
                    let messages = this.messages.concat(record);
                    this.set("messages", messages);
                }
            };
        } catch {
            alert("unable to subscribe to conversation");
        }
    }

    endSubscription() {
        this.channel.terminate();
    }
}