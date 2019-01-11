var channelWorker = new Worker("../result-worker");
export class PubSub {
    private channel
    constructor(skygear) {
        this.channel = skygear.pubsub;
    }
    private async response() {
        try {
            return new Promise((resolve, reject) => {
                channelWorker.onmessage = (msg) => {
                    if (msg.data.res === "success") {
                        resolve(msg.data.result);
                    } else {
                        reject(new Error("Unable to join."));
                    }
                }
            })
        } catch ({message: error}) {
            return { error }
        }

    }

    private handler(info: any) {
        let payload = NSJSONSerialization.dataWithJSONObjectOptionsError(info, NSJSONWritingOptions.PrettyPrinted);
        let newResult = NSString.alloc().initWithDataEncoding(payload, NSUTF8StringEncoding);
        let result = JSON.parse(newResult.toString())
        channelWorker.postMessage({ result, error: null });
    }

   async subscribe(channelName: string) {
        try {
            await this.channel.subscribeToHandler(channelName, this.handler)
            return this.response()
        } catch ({ message: error }) {
            return { error }
        }
    }

    async publish(channelName: string, payload: any) {
        try {
            return await this.channel.publishMessageToChannel({ payload }, channelName);
        } catch ({ message: error }) {
            return { error }
        }
    }
}