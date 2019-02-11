var SkygearSdk = require("nativescript-skygear-sdk").SkygearSdk;
var skygearSdk = new SkygearSdk({ apiKey: "plugintest123", address: "http://localhost:3001/" });

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

describe("database functions", function() {
    it("exists", function() {
        expect(skygearSdk.db).toBeDefined();
    });

    it("private database exists", function(){
        expect(skygearSdk.db.getPrivateDatabase()).not.toBeUndefined()
    })

    it("public database exists", function(){
        expect(typeof skygearSdk.db.getPublicDatabase()).not.toBeUndefined()
    })
})