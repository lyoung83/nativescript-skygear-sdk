declare var SKYRecordSerializer: any;

export class Auth {
    private auth
    constructor(skygear) {
        this.auth = skygear.auth;
    }

    async resultFunc(result, err) {
        try {
            if (err) {
                throw new Error(err)
            }
            let _serializer = new SKYRecordSerializer();
            let ref = await _serializer.dictionaryWithRecord(result);
            let final = await NSJSONSerialization.dataWithJSONObjectOptionsError(ref, NSJSONWritingOptions.PrettyPrinted);
            let newResult = await NSString.alloc().initWithDataEncoding(final, NSUTF8StringEncoding);
            let json = await JSON.parse(newResult.toString())
            return json;
        } catch (e) {
            throw new Error(e)
        }
    }

    async signupWithUsername(username: string, password: string) {
        try {
            await this.auth
                .signupWithUsernamePasswordCompletionHandler(username, password, this.resultFunc);
            return this.resultFunc(this.auth.currentUser, null)
        } catch {
            return { error: "duplicate record or missing information" }
        }

    }

    async signupWithEmail(email: string, password: string) {
        try {
            await this.auth
                .signupWithEmailPasswordCompletionHandler(email, password, this.resultFunc);
            return this.resultFunc(this.auth.currentUser, null)
        } catch {
            return { error: "duplicate record or missing information" }
        }
    }

    async loginWithUsername(username: string, password: string) {
        try {
            await this.auth
                .loginWithUsernamePasswordCompletionHandler(username, password, this.resultFunc)
            return this.resultFunc(this.auth.currentUser, null);
        } catch {
            return { error: "unable to login" }
        }

    }

    async loginWithEmail(email: string, password: string) {
        try {
            await this.auth
                .loginWithEmailPasswordCompletionHandler(email, password, this.resultFunc);
            return this.resultFunc(this.auth.currentUser, null)
        } catch {
            return { error: "unable to login" }
        }
    }

    async logout() {
        try {
            await this.auth.logoutWithCompletionHandler(this.resultFunc);
            return this.resultFunc(this.auth.currentUser, null);
        } catch {
            return { error: "Logout Failed" }
        }
    }

}