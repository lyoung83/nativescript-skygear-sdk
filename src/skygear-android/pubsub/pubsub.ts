export const spawnWorker = () => {
    if (global["TNS_WEBPACK"]) {
        const WebpackWorker = require("nativescript-worker-loader!../result-worker.js");
        return new WebpackWorker();
    } else {
        return new Worker('../result-worker.js');
    }
};

declare var io: any, java: any;

const SKYPubsubContainer = io.skygear.skygear.PubsubContainer;
export const SKYPubsubHandler = io.skygear.skygear.PubsubHandler;
const JSONObject = org.json.JSONObject;
const Map = java.util.HashMap;
const Bool = java.util.Boolean;

export class PubSubResponse extends SKYPubsubHandler {
    worker: Worker = spawnWorker();
    handle(data) {
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

    private createMap(payloadObject) {
        let map = new Map();
        for (const key in payloadObject) {
            if (payloadObject.hasOwnProperty(key)) {

                let isArray = Array.isArray(payloadObject[key]);

                if (typeof payloadObject[key] === "boolean") {
                    map.put(key, Bool.valueOf(payloadObject[key]));
                } else if (isArray) {
                    map.put(key, this.createArray(payloadObject[key]));
                } else {
                    map.put(key, payloadObject[key]);
                }
            }
        }
        return map;
    }

    private createArray(array) {
        let newArray;

        switch (typeof array[0]) {
            case "number":
                newArray = Array.create("int", array.length);
                break;
            case "string":
                newArray = Array.create(java.lang.String, array.length);
                break;
            default:
                break;
        }

        array.forEach((item, index) => {
            newArray[index] = item;
        });
        return newArray;
    }

    private createPayload(payload) {
        let map = new Map();
        if (typeof payload === "object" && !Array.isArray(payload)) {
            map.put("payload", this.createMap(payload));
        } else if (typeof payload === "object" && Array.isArray(payload)) {
            map.put("payload", this.createArray(payload));
        } else if (typeof payload === "boolean") {
            map.put("payload", Bool.valueOf(payload));
        } else {
            map.put("payload", payload);
        }

        return map;
    }

    async subscribe(channelName: string) {
        try {
            let pubSubChannel = new PubSubResponse();
            await this.channel.subscribe(channelName, pubSubChannel);
            return pubSubChannel.worker;
        } catch ({ message: error }) {
            return { error };
        }
    }

    async publish(channelName: string, payload: any) {
        try {
            let payloadMap = this.createPayload(payload);
            return await this.channel.publish(channelName, new JSONObject(payloadMap));
        } catch ({ message: error }) {
            return { error };
        }
    }
}