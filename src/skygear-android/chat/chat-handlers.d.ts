export declare var GetCallback: any;
export declare var LambdaCallback: any;
export declare var SaveCallback: any;
export declare var Serializer: any;
export declare class SKYSaveCallback extends SaveCallback {
    worker: Worker;
    onSuccess(object: any): void;
    onFail(error: any): void;
}
export declare class SKYGetCallback extends GetCallback {
    worker: Worker;
    onSuccess(object: any): void;
    onGetCachedResult(object: any): void;
    onFail(error: any): void;
}
export declare class SKYGetCollectionCallback extends GetCallback {
    worker: Worker;
    onSuccess(object: any): void;
    onGetCachedResult(object: any): void;
    onFail(error: any): void;
}
export declare class SKYLambdaCallback extends LambdaCallback {
    worker: Worker;
    onLambdaSuccess(object: any): void;
    onLambdaFail(error: any): void;
}
