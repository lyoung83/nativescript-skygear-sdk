export const spawnWorker = () => {
    if (global["TNS_WEBPACK"]) {
        const WebpackWorker = require("nativescript-worker-loader!../result-worker.js");
        return new WebpackWorker();
    } else {
        return new Worker('../result-worker.js');
    }
};

declare var io: any;
export const SKYRecordSaveResponseHandler = io.skygear.skygear.RecordSaveResponseHandler;
export const SKYRecordQueryResponseHandler = io.skygear.skygear.RecordQueryResponseHandler;
export const SKYRecordDeleteResponseHandler = io.skygear.skygear.RecordDeleteResponseHandler;
// export const databaseWorker = spawnWorker();

const SKYErrorSerializer = io.skygear.skygear.ErrorSerializer;

export class RecordSaveResponse extends SKYRecordSaveResponseHandler {
    worker: Worker = spawnWorker();

    onSaveSuccess(result) {
        this.worker.postMessage({ result, error: null });
        return result;
    }
    onSaveFail(error) {
        this.worker.postMessage({ result: null, error});
        return error;
    }

    onSuccess(record) {
        let json = JSON.parse(record);
        this.onSaveSuccess(json["result"][0]);
    }

    onFail(err) {
        let json = SKYErrorSerializer.serialize(err);
        let error = JSON.parse(json);
        this.onSaveFail(error["name"]);
    }
}

export class QueryResponse extends SKYRecordQueryResponseHandler {
    worker: Worker = spawnWorker();

    onQuerySuccess(result) {
        this.worker.postMessage({ result, error: null });
        return result;
    }

    onQueryError(error) {
        this.worker.postMessage({ result: null, error });
        return error;
    }

    onSuccess(result) {
        let records = JSON.parse(result);
        this.onQuerySuccess(records["result"]);
    }

    onFailure(err) {
        let json = SKYErrorSerializer.serialize(err);
        let error = JSON.parse(json);
        this.onQueryError(error["name"]);
    }
}


export class RecordFetchResponse extends SKYRecordQueryResponseHandler {
    worker: Worker = spawnWorker();

    onQuerySuccess(result) {
        this.worker.postMessage({ result, error: null });
        return result;
    }

    onQueryError(error) {
        this.worker.postMessage({ result: null, error });
        return error;
    }

    onSuccess(result) {
        let records = JSON.parse(result);
        this.onQuerySuccess(records["result"][0]);
    }

    onFailure(err) {
        let json = SKYErrorSerializer.serialize(err);
        let error = JSON.parse(json);
        this.onQueryError(error["name"]);
    }
}

export class RecordDeleteResponse extends SKYRecordDeleteResponseHandler {
    worker: Worker = spawnWorker();

    onDeleteSuccess(result) {
        this.worker.postMessage({ result, error: null });
        return result;
    }

    onDeleteError(error) {
        this.worker.postMessage({ result: null, error });
        return error;
    }

    onSuccess(result) {
        let records = JSON.parse(result);
        this.onDeleteSuccess(records["result"][0]);
    }

    onFailure(err) {
        let json = SKYErrorSerializer.serialize(err);
        let error = JSON.parse(json);
        this.onDeleteError(error["name"]);
    }
}