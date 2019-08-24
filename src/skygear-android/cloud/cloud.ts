declare var io: any, java: any;
const Bool = java.lang.Boolean;
const Map = java.util.HashMap;
export const LambdaCallback = io.skygear.skygear.LambdaResponseHandler;
export class SKYLambdaCallback extends (LambdaCallback as {new(): any}) {
    private resolve;
    private reject;

    constructor(res, rej) {
        super();
        this.resolve = res;
        this.reject = rej;
    }

    onLambdaSuccess(object) {
        let result = JSON.parse(object);
        this.resolve(result);
        return;
    }

    onLambdaFail(err) {
        let error = err.getMessage();
        this.reject(error);
        return;
    }
}

export class Cloud {
    private skygear;
    constructor(skygear) {
        this.skygear = skygear;
    }

    private createMap(object) {
        let map = new Map();
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                if (typeof object[key] === "boolean") {
                    map.put(key, Bool.valueOf(object[key]));
                } else {
                    map.put(key, object[key]);
                }
            }
        }
        return map;
    }

    callLambda(name, args = {}) {
        return new Promise<any>((resolve, reject) => {
            let response = new SKYLambdaCallback(resolve, reject);
            let map = this.createMap(args);
            this.skygear.callLambdaFunction(name, map, response);
        });
    }
}