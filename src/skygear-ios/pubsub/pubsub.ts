import { spawnWorker } from "..";

export class PubSub {
    private channel
    constructor(skygear) {
        this.channel = skygear.pubsub;
    }

    private handler(worker: Worker){
        return function (info: any) {
        let payload = NSJSONSerialization.dataWithJSONObjectOptionsError(info, NSJSONWritingOptions.PrettyPrinted);
        let newResult = NSString.alloc().initWithDataEncoding(payload, NSUTF8StringEncoding);
        let result = JSON.parse(newResult.toString())
        worker.postMessage({ result, error: null });
    }
}
    /**
     * subscribes to a Pubsub channel on the skygear backend and sends back a nativescript worker.
     * @param channelName string representing the name of the channel to subscribe to.
     * @returns Worker
     * @example
     * var channel = pubsub.subscribe("hello")
     * channel.onmessage = (response) => console.log(response.data.result);
     * channel.onerror = () => channel.terminate()
     */
   async subscribe(channelName: string) {
        try {
            let worker = spawnWorker();
            await this.channel.subscribeToHandler(channelName, this.handler(worker))
            return worker
        } catch ({ message: error }) {
            return { error }
        }
    }

    /**
     * Publish a message to a selected Pubsub channel.
     * @param channelName the name of the channel to publish to.
     * @param payload the message you want to send in json format;
     */
    async publish(channelName: string, payload: any) {
        try {
            return await this.channel.publishMessageToChannel({ payload }, channelName);
        } catch ({ message: error }) {
            return { error }
        }
    }
}