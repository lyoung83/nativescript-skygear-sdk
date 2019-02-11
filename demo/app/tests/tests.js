var SkygearSdk = require("nativescript-skygear-sdk").SkygearSdk;
var skygearSdk = new SkygearSdk({ apiKey: "plugintest123", address: "http://localhost:3001/" });
/**
 * Testing against the plugin api to make sure the necessary containers are being returned
 * from the sdk son ios and android.
 * will add some tests for async operations soon.
 */

describe("version function", function() {
    it("exists", function() {
        expect(skygearSdk.version).toBeDefined();
    });

    it("returns a string", function() {
        expect(skygearSdk.version()).toEqual("0.0.1");
    });

    it("container exists", function() {
        expect(skygearSdk.getContainer()).not.toBeUndefined();
    });
});

describe("database containers", function() {
    it("exists", function() {
        expect(skygearSdk.db).toBeDefined();
    });

    it("private database exists", function(){
        expect(skygearSdk.db.getPrivateDatabase()).not.toBeUndefined();
    })

    it("public database exists", function(){
        expect(typeof skygearSdk.db.getPublicDatabase()).not.toBeUndefined();
    });
});
