import { Observable } from 'tns-core-modules/data/observable';
import { SkygearSdk } from 'nativescript-skygear-sdk';
import { ItemEventData, ListView } from 'tns-core-modules/ui/list-view/list-view';
import { action, ActionOptions, login, LoginOptions, confirm as tnsConfirm } from 'tns-core-modules/ui/dialogs/dialogs';

export class HelloWorldModel extends Observable {
  public message: string;
  private auth;
  user: any;
  selectedUser: any;
  users: [any];
  isLoading: boolean;

  constructor(private skygearSdk: SkygearSdk) {
    super();
    const { auth, cloud } = skygearSdk;
    this.auth = auth;
    this.message = "You are not logged in";
    auth.getWhoAmI().then(user => {
      if (user.username) {
        this.user = user;
        this.set("message", "You are logged in as " + user.username);
        this.getUsers();
        cloud.callLambda("hello")
        .then(r => console.log(r), e => console.log(e));
      }
    }, () => alert("Token expired please log in"));

  }

  loginOrRegister() {
    const actionOptions: ActionOptions = {
      title: "Auth Actions",
      message: "If you have an account login, or click register to get started",
      actions: ["Login", "Register", "Reset Password", "Logout"],
      cancelButtonText: "Cancel",
      cancelable: true,
    };
    action(actionOptions).then(response => {
      switch (response) {
        case "Login":
          this.loginModal();
          break;
        case "Register":
          this.registerModal();
          break;
        case "Reset Password":
          alert("Not Implemented");
          break;
        case "Logout":
          this.logoutModal();
          break;
        default:
          alert("Action Cancelled");
          break;
      }
    });
  }

  loginModal() {
    let loginOptions: LoginOptions = {
      title: "Login",
      userName: "username",
      password: "password",
      cancelButtonText: "Cancel",
      okButtonText: "Login"
    };
    login(loginOptions).then(response => {
      if (response.result) {
        this.login(response.userName, response.password);
      } else {
        alert("Action Cancelled");
      }
    });
  }

  registerModal() {
    let registerOptions: LoginOptions = {
      title: "Register",
      userName: "username",
      password: "password",
      cancelButtonText: "Cancel",
      okButtonText: "Register"

    };
    login(registerOptions).then(response => {
      if (response.result) {
        this.register(response.userName, response.password);
      } else {
        alert("Action Cancelled");
      }
    });
  }

  logoutModal() {
    tnsConfirm("Are you sure you want to logout?")
      .then(async (result) => {
        if (result) {
          await this.auth.logout();
          this.set("message", "Logged out.");
          this.set("user", undefined);
        } else {
          alert("Action Cancelled");
        }
      });
  }

  userActions(args: ItemEventData) {
    const actionOptions: ActionOptions = {
      title: "Auth Actions",
      message: "If you have an account login, or click register to get started",
      actions: ["Show Info", "Create Conversation"],
      cancelButtonText: "Cancel",
      cancelable: true,
    };
    action(actionOptions).then(response => {
      switch (response) {
        case "Show Info":
          this.getUser(args);
          break;
        case "Create Conversation":
          this.createConversation(args);
          break;
        default:
          alert("Action Cancelled");
          break;
      }
    });
  }

  async login(username, password) {
    try {
      this.user = await this.auth.loginWithUsername(username, password);
      this.set("message", `you logged in as ${this.user.username}`);
      await this.getUsers();
      alert(`Logged in as ${this.user.username}`);
    } catch (e) {
      alert(e.message);
    }
  }

  async register(username, password) {
    try {
      this.user = await this.auth.signupWithUsername(username, password);
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

  async createConversation(args: ItemEventData) {
    try {
      const index = args.index;
      const listView = <ListView>args.object;
      const user = listView.items[index];
      const conversation: any = await this.skygearSdk.chat.createDirectConversation(user._id, `Conversation with ${user.username}`);
      alert(`created conversation with ${user.username} with id ${conversation._id}`);
    } catch (e) {
      alert(e.message);
    }
  }

  async getUsers() {
    try {
      if (!this.user) {
        throw new Error();
      }
      let userCollection: any = await this.skygearSdk.db.getUsers();
      let users = userCollection.filter(user => user._id !== this.user._id);

      this.set("users", users);
    } catch {
      alert("Unable to fetch users please log in");
    }
  }
}
