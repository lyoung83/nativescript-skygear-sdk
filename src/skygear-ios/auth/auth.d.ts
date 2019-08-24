export declare const spawnWorker: () => any;
export declare class Auth {
    private auth;
    constructor(skygear: any);
    private response;
    private userHandler;
    private promiseHandler(res, rej);
    getWhoAmI(): Promise<any>;
    signupWithUsername(username: string, password: string): Promise<any>;
    signupWithEmail(email: string, password: string): Promise<any>;
    loginWithUsername(username: string, password: string): Promise<any>;
    loginWithEmail(email: string, password: string): Promise<any>;
    logout(): Promise<any>;
}
