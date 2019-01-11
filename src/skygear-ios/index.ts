export { Auth } from './auth/auth';
export { Database } from './database/database';
export { PubSub } from './pubsub/pubsub';
export { Chat } from "./chat/chat";

export var globalWorker = new Worker('./result-worker');

declare var SKYRecordSerializer: any;
export const serializeResult = (result) => {
    let _serializer = new SKYRecordSerializer();
    let ref = _serializer.dictionaryWithRecord(result);
    let final = NSJSONSerialization.dataWithJSONObjectOptionsError(ref, NSJSONWritingOptions.PrettyPrinted);
    let newResult = NSString.alloc().initWithDataEncoding(final, NSUTF8StringEncoding);
    let json = JSON.parse(newResult.toString())
    return json;
}

export const serializeError = (error) => {
    if (error === null) {
        return error;
    }
    return error.userInfo.valueForKey("NSLocalizedDescription");

}