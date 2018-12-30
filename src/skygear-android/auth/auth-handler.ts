declare var io: any;
export const SKYAuthHandler = io.skygear.skygear.AuthResponseHandler;
export const SKYLogoutHandler = io.skygear.skygear.LogoutResponseHandler;



export class LoginHandler extends SKYAuthHandler {

    protected onAuthSuccess(result) {
        return result;
    };

    protected onAuthFail(error) {
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
        console.log(result)
        return ;
    };

    protected onLogoutFail(error) {
        console.log(error)
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