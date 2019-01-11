import { Observable, EventData } from 'tns-core-modules/data/observable';
import { SkygearSdk } from 'nativescript-skygear-sdk';
import { Todo } from './model';
import { ItemEventData, ListView } from 'tns-core-modules/ui/list-view/list-view';
import { skygearSdk as sdk } from './sdk'

export class HelloWorldModel extends Observable {
  public message: string;
  private skygearSdk: SkygearSdk;
  user: any;
  selectedUser: any;
  messages: [any];
  channel: any;
  todos: [any];
  users: [any];

  constructor() {
    super();
    this.skygearSdk = sdk;
    this.message = this.skygearSdk.message;
    this.getUsers();
    this.getTodos();
  }

  async onItemTap(args: ItemEventData) {
    const index = args.index;
    const listView = <ListView>args.object;
    const user = await this.skygearSdk.db.getPublicRecord("user", listView.items[index]._id);
    this.set("selectedUser", user);
    console.log(`ListView item tap`, user);
  }


  async login() {
    try {
      this.user = await this.skygearSdk.auth.loginWithUsername("frank6", "password");
      this.set("message", `you logged in as ${this.user.username}`);
      alert(`Logged in as ${this.user.username}`);
    } catch (e) {
      alert(e.message);
    }
  }


  getUser(args: ItemEventData) {
    try {
      const index = args.index;
      const listView = <ListView>args.object;
      const user = listView.items[index];
      alert(`got user ${user.username} with id ${user._id}`);
    } catch (e) {
      alert(e.message);
    }
  }

  async getUsers(){
    try {
    let users = await this.skygearSdk.db.getUsers();
    console.log(users);
    this.set("users", users);
    alert("Got Users")
    } catch {
      alert("Unable to fetch users");
    }
  }

  async pubsubStuff() {
    try {
      this.set("channel", await this.skygearSdk.pubsub.subscribe("hello"))
      alert("Subscription Over");
    } catch (error) {
      alert(error.message)
    }

  }

  async createTodo(todo: string) {
    try {
      let task = new Todo(todo, false);
      await this.skygearSdk.db.savePrivateRecord(task)
      this.getTodos();
      alert(`${todo} created`)
    } catch (error) {
      console.log(error);
    }
  }

  async removeTodo(args: ItemEventData) {
    try {
      const index = args.index;
      const id = this.todos[index]._id;
      await this.skygearSdk.db.deletePrivateRecord("todo", id)
      this.getTodos();
      alert("Item Deleted");
    } catch (e) {
      alert(e.message)
    }
  }

  async getTodos() {
    try {
      let result = await this.skygearSdk.db.getCollection("todo");
      this.set("todos", result);
      // @ts-ignore
      alert(`fetched ${result.length} todos`)
    } catch (error) {
      alert(error.message);
    }
  }

  async getFirstTodo() {
    try {
      let todo = this.todos[0]
      alert(`${todo.task} - ${todo.completed}`)
    } catch  {
      alert("No todos found");
    }
  }
}
