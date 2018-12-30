var SkygearSdk = require("nativescript-skygear-sdk").SkygearSdk;
var skygearSdk = new SkygearSdk();

describe("greet function", function() {
    it("exists", function() {
        expect(skygearSdk.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(skygearSdk.greet()).toEqual("Hello, NS");
    });
});