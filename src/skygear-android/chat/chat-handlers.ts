declare var io: any, java: any;

export var ChatContainer = io.skygear.plugins.chat.ChatContainer;
export var GetCallback = io.skygear.plugins.chat.GetCallback;
export var LambdaCallback = io.skygear.skygear.LambdaResponseHandler;
export var SaveCallback = io.skygear.plugins.chat.SaveCallback;
export var Serializer = io.skygear.skygear.RecordSerializer;

export class SKYSaveCallback extends SaveCallback {
    worker: Worker = new Worker('../result-worker');

    onSuccess(object) {
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

const createJson = (object) => {
    let jsArray = [];
    let newArray = object.toArray()
    for (let index = 0; index < newArray.length; index++) {
        jsArray.push(newArray[index]);
    }
    return jsArray
        .map(c => c.toJson())
        .map(c => JSON.parse(c));
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