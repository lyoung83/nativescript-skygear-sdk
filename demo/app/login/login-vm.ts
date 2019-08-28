import {Observable, EventData} from "tns-core-modules/data/observable";
import {skygearSdk} from "../sdk"
import { SkygearSdk } from "nativescript-skygear-sdk";
import { getFrameById } from "tns-core-modules/ui/frame/frame";
import { Auth } from "nativescript-skygear-sdk/skygear-ios";

export class LoginVM extends Observable {
    private auth: Auth;
    username: string = "";
    password: string = "";
    constructor(skygear: SkygearSdk) {
        super();
        const {auth} = skygear;
        this.auth = auth;
        this.auth.getWhoAmI()
        .then(user => {
            if (user.hasOwnProperty("_id")) {
                this.navigateToMain();
            }
        })
    }

    login(arg: EventData) {
        if (this.username === "") {
            alert("Please enter your username");
            return;
        }
        if (this.password === "") {
            alert("Please enter your password");
            return;
        }
        this.auth.loginWithUsername(this.username, this.password)
        .then((user) => {
            if (user.hasOwnProperty("_id")) {
                this.navigateToMain();
                return;
            }
            alert("Login Failed")
        })
    }

    private navigateToMain() {
     const featuredFrame = getFrameById("root");
    featuredFrame.navigate({
        moduleName: "main/main-page",
        clearHistory: true
    });
    }

}