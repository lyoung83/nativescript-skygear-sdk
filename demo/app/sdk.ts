import { SkygearSdk } from 'nativescript-skygear-sdk';
import { isAndroid } from 'tns-core-modules/ui/page/page';

const config = isAndroid ? { apiKey: "plugintest123", address: "http://10.0.3.2:3001/" } : { apiKey: "plugintest123", address: "http://localhost:3000/" };

export const skygearSdk = new SkygearSdk(config);