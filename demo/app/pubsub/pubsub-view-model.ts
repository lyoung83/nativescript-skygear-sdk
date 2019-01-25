import {Observable} from 'tns-core-modules/data/observable';
import { SkygearSdk } from 'nativescript-skygear-sdk';
import { PubSub } from 'nativescript-skygear-sdk/skygear-ios';
import { prompt, PromptOptions, ActionOptions, action } from 'tns-core-modules/ui/dialogs/dialogs';

export class PubsubViewModel extends Observable {
	messages: string[];
	currentChannel: string = "No channel selected.";
	private channel
	private pubsub: PubSub
	constructor(private skygear: SkygearSdk) {
		super();
		const { pubsub } = skygear;
		this.pubsub = pubsub
	}

	channelActions(){
		let actionOptions: ActionOptions = {
			title: "Pubsub Actions",
			message: "Select what you would like to do.",
			actions: ["Subscribe", "Publish", "Cancel Subscription"]
		}

			action(actionOptions)
			.then(action => {
				switch (action) {
					case "Subscribe":
						this.assignChannel();
						break;
					case "Publish":
						this.publishMessage();
						break;
					case "Cancel Subscription":
						this.channel.terminate()
						this.set("channel", undefined);
						this.set("currentChannel", "No channel selected.")
						break;
					default:
						break;
				}
			});
		}


	 assignChannel(){
		let promptOptions: PromptOptions = {
			title: "Subscribe to a channel",
			cancelButtonText: "Cancel",
			okButtonText: "Subscribe"
		}
		prompt(promptOptions).then(async (res) => {
			if (res.result){
				try {
					let channel:any;

					if (this.channel){
						// try to terminate channel before starting a new subscription
						this.channel.terminate();
					}

					channel = await this.pubsub.subscribe(res.text);
					this.set("messages", []);
					this.set("currentChannel", res.text)
					this.set("channel", channel);
					alert(`subscribed to ${res.text} channel`)
					channel.onmessage = (msg) => {
						let data = JSON.stringify(msg.data.result);
						let messages = this.messages.concat(data);
						this.set("messages", messages)
					}
					} catch (error) {
						alert(error);
					}
			} else {
				alert("Action Cancelled")
			}
		});
	}

	publishMessage(){
		let promptOptions: PromptOptions = {
			title: "Send a message",
			cancelButtonText: "Cancel",
			okButtonText: "Send"
		}
		prompt(promptOptions).then(res => {
			if (res.result){
				let message = res.text
				this.pubsub.publish(this.currentChannel || "default", message)
			} else {
				alert("Action Cancelled")
			}
		});
	}
}