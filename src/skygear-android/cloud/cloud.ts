import { spawnWorker } from "..";

declare var io: any, java: any;
var Bool = java.lang.Boolean;
var Map = java.util.HashMap;
export var LambdaCallback = io.skygear.skygear.LambdaResponseHandler;
export class SKYLambdaCallback extends LambdaCallback {
    worker: Worker = spawnWorker();

    onLambdaSuccess(object) {
        let result = JSON.parse(object);
        this.worker.postMessage({ result, error: null });
        return;
    }

    onLambdaFail(err) {
        let error = err.getMessage();
        this.worker.postMessage({ result: null, error });
        return;
    }
}

export class Cloud {
    private skygear
    constructor(skygear) {
        this.skygear = skygear;
    }

    private createMap(object) {
        var map = new Map();
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                if (typeof object[key] === "boolean") {
                    map.put(key, Bool.valueOf(object[key]))
                } else {
                    map.put(key, object[key])
                }
            }
        }
        return map
    }

    callLambda(name, args = {}) {
        let response = new SKYLambdaCallback();
        let map = this.createMap(args);
        this.skygear.callLambdaFunction(name, map, response);

        return new Promise<any>((resolve, reject) => {
            response.worker.onmessage = (msg) => {
                if (msg.data.res === "success") {
                    resolve(msg.data.result)
                } else {
                    reject(msg.data.result)
                }
                response.worker.terminate();
            }
        });
    }
}