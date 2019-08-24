
export class Cloud {
    private skygear;
    constructor(skygear) {
        this.skygear = skygear;
    }

    private createDictionary(object) {
        let values = [];
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
        return new Promise<any>((resolve, reject) => {
            let dictionary = this.createDictionary(args);
            this.skygear.callLambdaDictionaryArgumentsCompletionHandler(name, dictionary, (res, err: NSError) => {
                let result;
                let error;
                if (res) {
                    let test = NSJSONSerialization.dataWithJSONObjectOptionsError(res, NSJSONWritingOptions.PrettyPrinted);
                    let jsonString = NSString.alloc().initWithDataEncoding(test, NSUTF8StringEncoding);
                    result = JSON.parse(jsonString.toString());
                }
                if (err) {
                    error = err.userInfo.valueForKey("NSLocalizedDescription");
                    reject(error);
                    return;
                }
                resolve(result);
                return;
            });
        });
    }
}
