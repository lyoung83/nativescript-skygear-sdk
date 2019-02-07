import { serializeResult, serializeError } from "../";
export const spawnWorker = () => {
    if (global["TNS_WEBPACK"]) {
        const WebpackWorker = require("nativescript-worker-loader!../result-worker.js");
        return new WebpackWorker();
    } else {
        return new Worker('../result-worker.js');
    }
};

var authWorker = spawnWorker();

/**
 * Class for Authentication against a Skygear backend.
 */
export class Auth {
    private auth
    constructor(skygear) {
        this.auth = skygear.auth;
    }

    private response = () => {
        return new Promise<any>((resolve, reject) => {
            authWorker.onmessage = ({ data: { result } }) => {
                try {
                    resolve(result)
                } catch {
                    reject(new Error("Failed data fetch"));
                }
            }
        });
    }

    private userHandler = (user, err) => {
        let result = serializeResult(user);
        let error = serializeError(err);
        return authWorker.postMessage({ result, error })
    }

    async getWhoAmI(){
        try {
             await this.auth.getWhoAmIWithCompletionHandler(this.userHandler)
            return this.response()
        } catch {
            return { error: "Not currently logged in." }
        }
    }

    /**
     * Create a login with a unique username and password
     * @param username
     * @param password
     */
    async signupWithUsername(username: string, password: string) {
        try {
            await this.auth
                .signupWithUsernamePasswordCompletionHandler(username, password, this.userHandler);
            return this.response()
        } catch {
            return { error: "duplicate record or missing information" }
        }

    }

    /**
     * Create a login with an unique email address and password
     * @param email
     * @param password
     */
    async signupWithEmail(email: string, password: string) {
        try {
            await this.auth
                .signupWithEmailPasswordCompletionHandler(email, password, this.userHandler);
            return this.response();
        } catch {
            return { error: "duplicate record or missing information" }
        }
    }

    /**
     * Authenticate account with a username and password.
     * @param username
     * @param password
     */
    async loginWithUsername(username: string, password: string) {
        try {
            await this.auth
                .loginWithUsernamePasswordCompletionHandler(username, password, this.userHandler);
            return this.response();
        } catch ({ message }) {
            return { error: message }
        }

    }

    /**
     * Authenticate with a email and password.
     * @param email
     * @param password
     */
    async loginWithEmail(email: string, password: string) {
        try {
            await this.auth
                .loginWithEmailPasswordCompletionHandler(email, password, this.userHandler);

            return this.response();

        } catch {
            return { error: "unable to login" }
        }
    }

    /**
     * Clear authentication from container.
     */
    async logout() {
        try {
            await this.auth.logoutWithCompletionHandler(this.userHandler);
            return this.response();

        } catch {
            return { error: "Logout Failed" }
        }
    }

}