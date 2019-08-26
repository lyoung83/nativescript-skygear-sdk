export declare const SKYRecordSaveResponseHandler: any;
export declare const SKYRecordQueryResponseHandler: any;
export declare const SKYRecordDeleteResponseHandler: any;
declare const RecordSaveResponse_base: new () => any;
export declare class RecordSaveResponse extends RecordSaveResponse_base {
    resolve: any;
    reject: any;
    constructor(res: any, rej: any);
    onSaveSuccess(result: any): any;
    onSaveFail(error: any): any;
    onSuccess(record: any): void;
    onFail(err: any): void;
}
declare const QueryResponse_base: new () => any;
export declare class QueryResponse extends QueryResponse_base {
    resolve: any;
    reject: any;
    constructor(res: any, rej: any);
    onQuerySuccess(result: any): any;
    onQueryError(error: any): any;
    onSuccess(result: any): void;
    onFailure(err: any): void;
}
declare const RecordFetchResponse_base: new () => any;
export declare class RecordFetchResponse extends RecordFetchResponse_base {
    resolve: any;
    reject: any;
    constructor(res: any, rej: any);
    onQuerySuccess(result: any): any;
    onQueryError(error: any): any;
    onSuccess(result: any): void;
    onFailure(err: any): void;
}
declare const RecordDeleteResponse_base: new () => any;
export declare class RecordDeleteResponse extends RecordDeleteResponse_base {
    resolve: any;
    reject: any;
    constructor(res: any, rej: any);
    onDeleteSuccess(result: any): any;
    onDeleteError(error: any): any;
    onSuccess(result: any): void;
    onFailure(err: any): void;
}
