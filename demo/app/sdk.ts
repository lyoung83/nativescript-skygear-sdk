import { SkygearSdk } from 'nativescript-skygear-sdk';
import { isAndroid } from 'tns-core-modules/ui/page/page';

var config = isAndroid ? { apiKey: "plugintest123", address: "http://10.0.3.2:3001/" } : { apiKey: "plugintest123", address: "http://localhost:3001/" };

export var skygearSdk = new SkygearSdk(config);