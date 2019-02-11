export declare const SKYAuthHandler: any;
export declare const SKYLogoutHandler: any;
export declare const authWorker: Worker;
export declare class LoginHandler extends SKYAuthHandler {
    protected onAuthSuccess(result: any): any;
    protected onAuthFail(err: any): any;
    onSuccess(result: any): any;
    onFailure(error: any): any;
}
export declare class LogoutHandler extends SKYLogoutHandler {
    protected onLogoutSuccess(result: any): void;
    protected onLogoutFail(error: any): void;
    onSuccess(result: any): void;
    onFailure(error: any): void;
}
