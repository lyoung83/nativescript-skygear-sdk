import { serializeError, spawnWorker } from "..";

export class Cloud {
    private skygear
    constructor(skygear) {
        this.skygear = skygear;
    }

    private createDictionary(object) {
        var values = []
        let dict;
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                values.push(object[key]);
            }
        }
        dict = NSDictionary.dictionaryWithObjectsForKeys(values, Object.keys(object));
        return dict;
    }




    callLambda(name, args = {}) {
        let worker = spawnWorker();
        let dictionary = this.createDictionary(args);
        this.skygear.callLambdaDictionaryArgumentsCompletionHandler(name, dictionary, (res, err: NSError) => {
            let result;
            let error;
            if (res){
            let test = NSJSONSerialization.dataWithJSONObjectOptionsError(res, NSJSONWritingOptions.PrettyPrinted)
            var jsonString = NSString.alloc().initWithDataEncoding(test, NSUTF8StringEncoding);
            result = JSON.parse(jsonString.toString());
            }
            if(err){
                error = err.userInfo.valueForKey("NSLocalizedDescription");
            }
            worker.postMessage({ result, error });
            return;
        })

        return new Promise<any>((resolve, reject) => {
            worker.onmessage = (msg) => {
                if (msg.data.res === "success") {
                    resolve(msg.data.result);
                } else {
                    reject(msg.data.result);
                }
                worker.terminate();
            }
        })
    }
}