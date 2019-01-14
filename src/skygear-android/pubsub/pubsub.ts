declare var io: any, java: any;

var SKYPubsubContainer = io.skygear.skygear.PubsubContainer;
export var SKYPubsubHandler = io.skygear.skygear.PubsubHandler;
var JSONObject = org.json.JSONObject;
var Map = java.util.HashMap;
var Bool = java.util.Boolean;

var channelWorker = new Worker('../result-worker');

export class PubSubResponse extends SKYPubsubHandler {
    worker: Worker = new Worker('../result-worker');
    handle(data) {
        // console.log(data);
        let result = JSON.parse(data);
        this.worker.postMessage({ result, error: null });
        return;
    }
}

export class PubSub {
    private channel: any;

    constructor(skygear) {
        this.channel = new SKYPubsubContainer(skygear);
    }

    private response() {
        return new Promise((resolve, reject) => {
            channelWorker.onmessage = (msg) => {
                if (msg.data.res === "success") {
                    resolve(msg.data.result);
                } else {
                    reject(msg.data.error);
                }
            };
        });
    }

    private createMap(payloadObject) {
        var map = new Map();
        for (const key in payloadObject) {
            if (payloadObject.hasOwnProperty(key)) {

                var isArray = Array.isArray(payloadObject[key]);

                if (typeof payloadObject[key] === "boolean") {
                    map.put(key, Bool.valueOf(payloadObject[key]))
                } else if (isArray){
                    map.put(key, this.createArray(payloadObject[key]));
                }else {
                    map.put(key, payloadObject[key])
                }
            }
        }
        return map
    }

    private createArray(array){
        var newArray;
        console.log("type", typeof array[0]);

        switch (typeof array[0]) {
            case "number":
                newArray = Array.create("int", array.length);
                break;
            case "string":
                newArray = Array.create(java.lang.String, array.length)
                break;
            default:
                break;
        }

        array.forEach((item, index) => {
            newArray[index] = item;
        });
        return newArray
    }

    private createPayload(payload) {
        var map = new Map()
        if (typeof payload === "object" && !Array.isArray(payload)) {
            map.put("payload", this.createMap(payload));
        } else if (typeof payload === "object" && Array.isArray(payload)) {
            map.put("payload", this.createArray(payload))
        } else if (typeof payload === "boolean") {
            map.put("payload", Bool.valueOf(payload));
        } else {
            map.put("payload", payload);
        }

        return map;
    }

    async subscribe(channelName: string) {
        try {
            let pubSubChannel = new PubSubResponse()
            await this.channel.subscribe(channelName, pubSubChannel)
            return pubSubChannel.worker;
        } catch ({ message: error }) {
            return { error }
        }
    }

    async publish(channelName: string, payload: any) {
        try {
            let payloadMap = this.createPayload(payload)
            return await this.channel.publish(channelName, new JSONObject(payloadMap));
        } catch ({ message: error }) {
            return { error }
        }
    }
}