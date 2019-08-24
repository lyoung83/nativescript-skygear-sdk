import { serializeResult, serializeError } from "../";

/**
 * Class for Authentication against a Skygear backend.
 */
export class Auth {
    private auth;
    constructor(skygear) {
        this.auth = skygear.auth;
    }


    private promiseHandler(res, rej) {
        return (user, err) => {
            if (err) {
                rej(serializeError(err));
                return;
            }
            res(serializeResult(user));
        }
    }

    async getWhoAmI() {
        try {

            return await new Promise<any>((res, rej) =>{
                this.auth.getWhoAmIWithCompletionHandler(this.promiseHandler(res, rej));
            });
        } catch {
            return { error: "Not currently logged in." };
        }
    }

    /**
     * Create a login with a unique username and password
     * @param username
     * @param password
     */
    async signupWithUsername(username: string, password: string) {
        try {
            return await new Promise((res, rej) => {
                this.auth
                .signupWithUsernamePasswordCompletionHandler(username, password, this.promiseHandler(res, rej));
            });
        } catch {
            return { error: "duplicate record or missing information" };
        }

    }

    /**
     * Create a login with an unique email address and password
     * @param email
     * @param password
     */
    async signupWithEmail(email: string, password: string) {
        try {
            return await new Promise((res, rej) => {
             this.auth
                .signupWithEmailPasswordCompletionHandler(email, password, this.promiseHandler(res, rej));
            });
        } catch {
            return { error: "duplicate record or missing information" };
        }
    }

    /**
     * Authenticate account with a username and password.
     * @param username
     * @param password
     */
    async loginWithUsername(username: string, password: string) {
        try {
            return await new Promise((res, rej) => {
             this.auth
                .loginWithUsernamePasswordCompletionHandler(username, password, this.promiseHandler(res, rej));
            });
        } catch ({ message }) {
            return { error: message };
        }

    }

    /**
     * Authenticate with a email and password.
     * @param email
     * @param password
     */
    async loginWithEmail(email: string, password: string) {
        try {
            return await new Promise((res, rej) => {
             this.auth
                .loginWithEmailPasswordCompletionHandler(email, password, this.promiseHandler(res, rej));
            });

        } catch {
            return { error: "unable to login" };
        }
    }

    /**
     * Clear authentication from container.
     */
    async logout() {
        try {
            return await new Promise((res, rej) => {
             this.auth.logoutWithCompletionHandler(this.promiseHandler(res, rej));
            });

        } catch {
            return { error: "Logout Failed" };
        }
    }

}