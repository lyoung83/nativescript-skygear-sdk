declare var io: any, java: any;

export var GetCallback = io.skygear.plugins.chat.GetCallback;
export var LambdaCallback = io.skygear.skygear.LambdaResponseHandler;
export var SaveCallback = io.skygear.plugins.chat.SaveCallback;
export var Serializer = io.skygear.skygear.RecordSerializer;

const createJson = (chatArray) => {
    let jsArray = [];
    let newArray = chatArray.toArray()
    for (let index = 0; index < newArray.length; index++) {
        jsArray.push(newArray[index]);
    }
    return jsArray
        .map(c => c.toJson())
        .map(c => JSON.parse(c));
}

export class SKYSaveCallback extends SaveCallback {
    worker: Worker = new Worker('../result-worker');

    onSuccess(object) {
        let result = JSON.parse(object.toJson());
        this.worker.postMessage({ result, error: null });
        return;
    }

    onFail(error) {
        try {
            let _id = error.getConversationId();
            this.worker.postMessage({ result: { _id }, error: null })
            return;
        } catch {
            let err = error.getMessage()
            this.worker.postMessage({ result: null, error: err });
            return;
        }
    }
}

export class SKYGetCallback extends GetCallback {
    worker: Worker = new Worker('../result-worker');

    onSuccess(object) {
        let result = JSON.parse(object.toJson());
        this.worker.postMessage({ result, error: null });
        return;
    }

    onGetCachedResult(object) {
        console.log(object);
        let result = JSON.parse(object.toJson());
        this.worker.postMessage({ result, error: null });
        return;
    }

    onFail(error) {
        console.log(error);
        this.worker.postMessage({ result: null, error });
        return;
    }
}

export class SKYGetCollectionCallback extends GetCallback {
    worker: Worker = new Worker('../result-worker');
    onSuccess(object) {
        let result = createJson(object);
        this.worker.postMessage({ result, error: null });
        return;
    }

    onGetCachedResult(object) {
        let result = createJson(object);
        this.worker.postMessage({ result, error: null });
        return;
    }

    onFail(error) {
        console.log(error);
        this.worker.postMessage({ result: null, error });
        return;
    }
}

export class SKYLambdaCallback extends LambdaCallback {
    worker: Worker = new Worker('../result-worker');

    onLambdaSuccess(object) {
        let result = JSON.parse(object);
        this.worker.postMessage({ result, error: null });
        return;
    }

    onLambdaFail(error) {
        this.worker.postMessage({ result: null, error });
        return;
    }
}