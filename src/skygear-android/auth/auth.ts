declare var io: any;
import { LoginHandler, LogoutHandler } from "./auth-handler";

export class Auth {
    private auth;
    constructor(skygear: any) {
        this.auth = skygear.getAuth();
    }

    async getWhoAmI() {
        try {
            return await new Promise((resolve, reject) => {
                this.auth.whoami(new LoginHandler(resolve, reject));
            });
        } catch {
            return { error: "Not currently logged in" };
        }
    }


    async signupWithUsername(username: string, password: string) {
        try {
            return await new Promise((resolve, reject) => {
                 this.auth
                .signupWithUsername(username, password, new LoginHandler(resolve, reject));
            });
        } catch {
            return { error: "duplicate record or missing information" };
        }

    }

    async signupWithEmail(email: string, password: string) {
        try {
            return await new Promise((resolve, reject) => {
                this.auth
                .signupWithEmail(email, password, new LoginHandler(resolve, reject));

            });
        } catch {
            return { error: "duplicate record or missing information" };
        }
    }

    async loginWithUsername(username: string, password: string) {
        try {
            return await new Promise((resolve, reject) => {
                this.auth
                .loginWithUsername(username, password, new LoginHandler(resolve, reject));
            });
        } catch (e) {
            return { error: e.message };
        }
    }

    async loginWithEmail(email: string, password: string) {
        try {
            return await new Promise((resolve, reject) => {
                this.auth
                .loginWithEmail(email, password, new LoginHandler(resolve, reject));
            });
        } catch {
            return { error: "unable to login" };
        }
    }

    async logout() {
        try {
            return await new Promise((resolve, reject) => {
                 this.auth.logout(new LogoutHandler(resolve, reject));
            });
        } catch {
            return { error: "Logout Failure" };
        }
    }

}