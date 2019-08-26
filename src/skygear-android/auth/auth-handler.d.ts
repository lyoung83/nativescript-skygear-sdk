export declare const SKYAuthHandler: any;
export declare const SKYLogoutHandler: any;
declare const LoginHandler_base: new () => any;
export declare class LoginHandler extends LoginHandler_base {
    resolve: any;
    reject: any;
    constructor(res: any, rej: any);
    protected onAuthSuccess(result: any): any;
    protected onAuthFail(err: any): any;
    onSuccess(result: any): any;
    onFailure(error: any): any;
}
declare const LogoutHandler_base: new () => any;
export declare class LogoutHandler extends LogoutHandler_base {
    resolve: any;
    reject: any;
    constructor(res: any, rej: any);
    protected onLogoutSuccess(result: any): void;
    protected onLogoutFail(error: any): void;
    onSuccess(result: any): void;
    onFailure(error: any): void;
}
