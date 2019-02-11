declare const io: any;
const SKYErrorSerializer = io.skygear.skygear.ErrorSerializer;

export const SKYAuthHandler = io.skygear.skygear.AuthResponseHandler;
export const SKYLogoutHandler = io.skygear.skygear.LogoutResponseHandler;

export const authWorker = new Worker('../result-worker');


export class LoginHandler extends SKYAuthHandler {

    protected onAuthSuccess(result) {
        authWorker.postMessage({ result, error: null });
        return result;
    }

    protected onAuthFail(err) {
        let json = SKYErrorSerializer.serialize(err);
        let error = JSON.parse(json);
        authWorker.postMessage({ result: null, error: error.message });
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

export class LogoutHandler extends SKYLogoutHandler {

    protected onLogoutSuccess(result) {
        authWorker.postMessage({ result, error: null });
        return;
    }

    protected onLogoutFail(error) {
        authWorker.postMessage({ result: null, error });
        return;
    }


    onSuccess(result) {
        return this.onLogoutSuccess(result);
    }

    onFailure(error) {
        return this.onLogoutFail(error);
    }
}