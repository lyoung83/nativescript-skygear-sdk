export declare const SKYRecordSaveResponseHandler: any;
export declare const SKYRecordQueryResponseHandler: any;
export declare const SKYRecordDeleteResponseHandler: any;
export declare var databaseWorker: Worker;
export declare class RecordSaveResponse extends SKYRecordSaveResponseHandler {
    worker: Worker;
    onSaveSuccess(result: any): any;
    onSaveFail(error: any): any;
    onSuccess(record: any): void;
    onFail(err: any): void;
}
export declare class QueryResponse extends SKYRecordQueryResponseHandler {
    onQuerySuccess(result: any): any;
    onQueryError(error: any): any;
    onSuccess(result: any): void;
    onFailure(err: any): void;
}
export declare class RecordFetchResponse extends SKYRecordQueryResponseHandler {
    onQuerySuccess(result: any): any;
    onQueryError(error: any): any;
    onSuccess(result: any): void;
    onFailure(err: any): void;
}
export declare class RecordDeleteResponse extends SKYRecordDeleteResponseHandler {
    onDeleteSuccess(result: any): any;
    onDeleteError(error: any): any;
    onSuccess(result: any): void;
    onFailure(err: any): void;
}
