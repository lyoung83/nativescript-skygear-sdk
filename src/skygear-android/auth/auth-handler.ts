declare const io: any;
const SKYErrorSerializer = io.skygear.skygear.ErrorSerializer;

export const SKYAuthHandler = io.skygear.skygear.AuthResponseHandler;
export const SKYLogoutHandler = io.skygear.skygear.LogoutResponseHandler;


export class LoginHandler extends (SKYAuthHandler as {new()}) {
    resolve;
    reject;
    constructor(res, rej) {
        super();
        this.resolve = res;
        this.reject = rej;
    }

    protected onAuthSuccess(result) {
        this.resolve(result);
        return result;
    }

    protected onAuthFail(err) {
        let json = SKYErrorSerializer.serialize(err);
        let error = JSON.parse(json);
        this.reject(error);
        return error;
    }

    onSuccess(result) {
        try {
            let json = JSON.parse(result);
            return this.onAuthSuccess(json["profile"]);
        } catch {
            return this.onAuthFail(new Error("Malformed server response"));
        }
    }

    onFailure(error) {
        console.log(error);
        return this.onAuthFail(new Error(error));
    }


}

export class LogoutHandler extends (SKYLogoutHandler as {new()}) {
    resolve;
    reject;
    constructor(res, rej) {
        super();
        this.resolve = res;
        this.reject = rej;
    }
    protected onLogoutSuccess(result) {
        this.resolve(result);
        return;
    }

    protected onLogoutFail(error) {
        this.reject(error);
        return;
    }


    onSuccess(result) {
        return this.onLogoutSuccess(result);
    }

    onFailure(error) {
        return this.onLogoutFail(error);
    }
}