declare var io: any;
const Serializer = io.skygear.skygear.RecordSerializer
import { LoginHandler, LogoutHandler } from "./auth-handler";

export class Auth {
    private auth
    constructor(skygear: any) {
        this.auth = skygear.getAuth();
    }


    async signupWithUsername(username: string, password: string) {
        try {
            await this.auth
                .signupWithUsername(username, password, new LoginHandler())
            return Serializer.serialize(this.auth.getCurrentUser())
        } catch {
            return { error: "duplicate record or missing information" }
        }

    }

    async signupWithEmail(email: string, password: string) {
        try {

            await this.auth
                .signupWithEmail(email, password, new LoginHandler());
            return Serializer.serialize(this.auth.getCurrentUser())
        } catch {
            return { error: "duplicate record or missing information" }
        }
    }

    async loginWithUsername(username: string, password: string) {
        try {
            await this.auth
                .loginWithUsername(username, password, new LoginHandler())
            return Serializer.serialize(this.auth.getCurrentUser());
        } catch (e) {
            return { error: e.message }
        }
    }

    async loginWithEmail(email: string, password: string) {
        try {
            await this.auth
                .loginWithEmail(email, password, new LoginHandler());

            return Serializer.serialize(this.auth.getCurrentUser());
        } catch {
            return { error: "unable to login" }
        }
    }

    async logout(){
        try {
            await this.auth.logout(new LogoutHandler());
            return Serializer.serialize(this.auth.getCurrentUser());
        } catch {
            return { error: "Logout Failure"}
        }
    }

}