import { SkygearSdk } from 'nativescript-skygear-sdk';
import { isAndroid } from 'tns-core-modules/ui/page/page';
// local
var config = isAndroid ? { apiKey: "plugintest123", address: "http://10.0.3.2:3001/" } : { apiKey: "plugintest123", address: "http://localhost:3001/" };

// remote
// var config = { apiKey: "6e4f44b812d24c7885f0e38df69150d8", address: "https://plugintest.skygeario.com/" }

export var skygearSdk = new SkygearSdk(config);