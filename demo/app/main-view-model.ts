import { Observable } from 'tns-core-modules/data/observable';
import { SkygearSdk } from 'nativescript-skygear-sdk';

export class HelloWorldModel extends Observable {
  public message: string;
  private skygearSdk: SkygearSdk;
  user: any;

  constructor() {
    super();
    this.skygearSdk = new SkygearSdk({ apiKey: "6e4f44b812d24c7885f0e38df69150d8", address: "https://plugintest.skygeario.com/" });
    this.message = this.skygearSdk.message;

    this.getUser();
  }

  async getUser() {
    this.user = await this.skygearSdk.auth.loginWithUsername("frank6", "password")
    // this.user = await this.skygearSdk.auth.logout();
    // this.user = await this.skygearSdk.auth.signupWithUsername("frank6", "password")
    console.log(this.user)
  }

}
