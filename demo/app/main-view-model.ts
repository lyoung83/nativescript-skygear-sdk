import { Observable } from 'tns-core-modules/data/observable';
import { SkygearSdk } from 'nativescript-skygear-sdk';
import { Todo } from './model';

export class HelloWorldModel extends Observable {
  public message: string;
  private skygearSdk: SkygearSdk;
  user: any;
  messages = [];
  channel: any;

  constructor() {
    super();
    // this.skygearSdk = new SkygearSdk({ apiKey: "6e4f44b812d24c7885f0e38df69150d8", address: "https://plugintest.skygeario.com/" });
    // this.skygearSdk = new SkygearSdk({ apiKey: "plugintest123", address: "http://10.0.3.2:3001/" });
    this.skygearSdk = new SkygearSdk({ apiKey: "plugintest123", address: "http://localhost:3001/" });
    this.message = this.skygearSdk.message;
    this.getUser()
      .then(
        () => this.recordStuff()
          .then(
            () => this.pubsubStuff()
              .then(
                () => this.skygearSdk.pubsub.publish("hello", { world: "reply" })
              )));
  }

  async getUser() {
    try {
      this.user = await this.skygearSdk.auth.loginWithUsername("frank", "password");
      // this.user = await this.skygearSdk.auth.logout();
      // this.user = await this.skygearSdk.auth.signupWithUsername("frank7", "password")
      console.log("view user", this.user)
    } catch (e) {
      console.log(e)
    }
  }

  async pubsubStuff() {
    try {
      this.channel = await this.skygearSdk.pubsub.subscribe("hello")
      this.messages.push(this.channel);
      this.skygearSdk.pubsub.publish("hello", { numbers: ["hi", "no"] })
      console.log(this.messages, this.messages.length);
      this.pubsubStuff();
      return "ok";
    } catch (error) {
      return { error }
    }

  }

  async recordStuff() {
    try {
      let task = new Todo("update database", false);
      // let result = await this.skygearSdk.db.savePrivateRecord(task)
      // let result = await this.skygearSdk.db.getPrivateRecord("todo", "todo/94D84FFC-C844-4BBB-A867-B6736CD1F85F");
      // let result = await this.skygearSdk.db.deletePrivateRecord("todo", "todo/F9C63647-ED7B-442D-8EBB-C27776654916")
      // let result = await this.skygearSdk.db.updatePrivateRecord(task, "todo/46E24C5B-91FF-407E-AC27-1A6806CB780E")
      let result = await this.skygearSdk.db.getCollection("todo");
      // let result = await this.skygearSdk.db.getUsers();
      console.log("view record", result);
      // let ids = result.map(record => record._id);
      // console.log("ids", ids);
    } catch (error) {
      console.log(error);
    }

  }

}
