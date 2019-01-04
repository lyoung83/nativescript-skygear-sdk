declare var io: any;
export const SKYAuthHandler = io.skygear.skygear.AuthResponseHandler;
export const SKYLogoutHandler = io.skygear.skygear.LogoutResponseHandler;

export var authWorker = new Worker('../result-worker');


export class LoginHandler extends SKYAuthHandler {

    protected onAuthSuccess(result) {
        authWorker.postMessage({result, error: null});
        return result;
    };

    protected onAuthFail(error) {
        authWorker.postMessage({result: null, error })
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
        return this.onAuthFail(new Error(error));
    }


};

export class LogoutHandler extends SKYLogoutHandler {

    protected onLogoutSuccess(result) {
        authWorker.postMessage({result, error: null});
        console.log(result)
        return;
    };

    protected onLogoutFail(error) {
        authWorker.postMessage({result: null, error })
        return;
    }


    onSuccess(result){
        console.log("logout success");

        return this.onLogoutSuccess(result);
    }

    onFailure(error){
        return this.onLogoutFail(error);
    }
};