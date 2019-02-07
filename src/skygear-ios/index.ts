export { Auth } from './auth/auth';
export { Database } from './database/database';
export { PubSub } from './pubsub/pubsub';
export { Chat } from "./chat/chat";
export { Cloud } from "./cloud/cloud";

declare var SKYRecordSerializer: any;
export const serializeResult = (result) => {
    if (result === null) {
        return result;
    }
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
    if (error.userInfo.valueForKey("SKYErrorMessage") === "Conversation with the participants already exists") {
        let _id = error.userInfo.valueForKey("conversation_id");
        return { _id };
    }
    console.log(error)
    return error.userInfo.valueForKey("NSLocalizedDescription");

};