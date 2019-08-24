export const spawnWorker = () => {
    if (global["TNS_WEBPACK"]) {
        const WebpackWorker = require("nativescript-worker-loader!../result-worker.js");
        return new WebpackWorker();
    } else {
        return new Worker('../result-worker.js');
    }
};

declare const io: any, java: any;

export const GetCallback = io.skygear.plugins.chat.GetCallback;
export const LambdaCallback = io.skygear.skygear.LambdaResponseHandler;
export const SaveCallback = io.skygear.plugins.chat.SaveCallback;
export const Serializer = io.skygear.skygear.RecordSerializer;
export const GetMessagesCallback = io.skygear.plugins.chat.GetMessagesCallback;
export const ConversationSubscriptionCallback = io.skygear.plugins.chat.ConversationSubscriptionCallback;
export const UserSubscriptionCallback = io.skygear.plugins.chat.UserChannelSubscriptionCallback;

const createJson = (chatArray) => {
    try {
        let jsArray = [];
        let newArray = chatArray.toArray();
        for (let index = 0; index < newArray.length; index++) {
            jsArray.push(newArray[index]);
        }
        return jsArray
            .map(c => c.toJson())
            .map(c => JSON.parse(c));
    } catch {
        return JSON.parse(chatArray.toJson());
    }
};

export class SKYSaveCallback extends (SaveCallback as {new()}) {
    resolve
    reject

    constructor(res, rej) {
        super()
        this.resolve = res;
        this.reject = rej;
    }

    onSuccess(object) {
        let result = JSON.parse(object.toJson());
        this.resolve(result);
        return;
    }

    onFail(error) {
        try {
            let _id = error.getConversationId();
            this.resolve({_id});
            return;
        } catch {
            let err = error.getMessage();
            this.reject(err);
            return;
        }
    }
}

export class SKYGetCallback extends (GetCallback as {new()}) {
    resolve
    reject
    constructor(res, rej) {
        super();
        this.resolve = res;
        this.reject = rej;
    }

    onSuccess(object) {
        let result = JSON.parse(object.toJson());
        this.resolve(result);
        return;
    }

    onGetCachedResult(object) {
        let result = JSON.parse(object.toJson());
        this.resolve(result);
        return;
    }

    onFail(err) {
        let error = err.getMessage();
        console.log(error);
        this.reject(error)
        return;
    }
}

export class SKYGetCollectionCallback extends (GetCallback as {new()}) {
    resolve
    reject
    constructor(res, rej) {
        super();
        this.resolve = res;
        this.reject = rej;
    }
    onSuccess(object) {
        let result = createJson(object);
        this.resolve(result);
        return;
    }

    onGetCachedResult(object) {
        let result = createJson(object);
        this.resolve(result);
        return;
    }

    onFail(err) {
        let error = err.getMessage();
        console.log(error);
        this.reject(error);
        return;
    }
}

export class SKYLambdaCallback extends (LambdaCallback as {new()}) {
    resolve
    reject
    constructor(res, rej) {
        super();
        this.resolve = res;
        this.reject = rej;
    }
    onLambdaSuccess(object) {
        let result = JSON.parse(object.toJson());
        this.resolve(result);
        return;
    }

    onLambdaFail(err) {
        let error = err.getMessage();
        this.reject(error);
        return;
    }
}

export class SKYGetMessagesCallback extends GetMessagesCallback {
    resolve
    reject
    constructor(res, rej) {
        super();
        this.resolve = res;
        this.reject = rej;
    }
    onSuccess(object) {
        let result = createJson(object);
        this.resolve(result);
        return;
    }

    onGetCachedResult(object) {
        let result = createJson(object);
        this.resolve(result);
        return;
    }

    onFail(err) {
        let error = err.getMessage();
        console.log(error);
        this.reject(error);
        return;
    }
}

enum EventTypes {
    EVENT_TYPE_CREATE = "create",
    EVENT_TYPE_UPDATE = "update",
    EVENT_TYPE_DELETE = "delete"
}


export class SKYConversationSubscription extends ConversationSubscriptionCallback {
    worker: Worker = spawnWorker();

    supportingEventTypes() {
        let array = Array.create(java.lang.String, 3);
        array[0] = EventTypes.EVENT_TYPE_CREATE;
        array[1] = EventTypes.EVENT_TYPE_DELETE;
        array[2] = EventTypes.EVENT_TYPE_UPDATE;
        return array;
    }

    notify(event: string, conversation: any) {
        let result = JSON.parse(conversation);
        this.worker.postMessage({ result, error: null });
        return;
    }
}

export class SKYUserSubscription extends UserSubscriptionCallback {
    worker: Worker = spawnWorker();

    supportingEventTypes() {
        let array = Array.create(java.lang.String, 3);
        array[0] = EventTypes.EVENT_TYPE_CREATE;
        array[1] = EventTypes.EVENT_TYPE_DELETE;
        array[2] = EventTypes.EVENT_TYPE_UPDATE;
        return array;
    }

    notify(_: string, data: any) {
        let result = JSON.parse(data);
        this.worker.postMessage({ result, error: null });
        return;
    }
}