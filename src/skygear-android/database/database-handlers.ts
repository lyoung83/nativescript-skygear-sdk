declare var io: any;
export const SKYRecordSaveResponseHandler = io.skygear.skygear.RecordSaveResponseHandler;
export const SKYRecordQueryResponseHandler = io.skygear.skygear.RecordQueryResponseHandler;
export const SKYRecordDeleteResponseHandler = io.skygear.skygear.RecordDeleteResponseHandler;

const SKYErrorSerializer = io.skygear.skygear.ErrorSerializer;

export class RecordSaveResponse extends (SKYRecordSaveResponseHandler as {new()}) {
    resolve: any;
    reject: any;
    constructor(res, rej) {
        super();
        this.resolve = res;
        this.reject = rej
    }
    onSaveSuccess(result) {
        this.resolve(result);
        return result;
    }
    onSaveFail(error) {
        this.reject(error);
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

export class QueryResponse extends (SKYRecordQueryResponseHandler as {new()}) {
    resolve: any;
    reject: any;
    constructor(res, rej) {
        super();
        this.resolve = res;
        this.reject = rej
    }
    onQuerySuccess(result) {
        this.resolve(result)
        return result;
    }

    onQueryError(error) {
       this.reject(error)
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


export class RecordFetchResponse extends (SKYRecordQueryResponseHandler as {new()}) {
    resolve: any;
    reject: any;
    constructor(res, rej) {
        super();
        this.resolve = res;
        this.reject = rej
    }

    onQuerySuccess(result) {
        this.resolve(result);
        return result;
    }

    onQueryError(error) {
        this.reject(error);
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

export class RecordDeleteResponse extends (SKYRecordDeleteResponseHandler as {new()}) {
    resolve: any;
    reject: any;
    constructor(res, rej) {
        super();
        this.resolve = res;
        this.reject = rej
    }

    onDeleteSuccess(result) {
        this.resolve(result);
        return result;
    }

    onDeleteError(error) {
        this.reject(error);
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