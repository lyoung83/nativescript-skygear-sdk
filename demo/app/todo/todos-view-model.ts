import { Observable } from "tns-core-modules/ui/page/page";
import { SkygearSdk } from "nativescript-skygear-sdk";
import { ItemEventData } from "tns-core-modules/ui/list-view/list-view";
import { action, ActionOptions, prompt } from "tns-core-modules/ui/dialogs";

import { Todo, iTodo } from "~/model";

export class TodoView extends Observable {
    message: string
    todos: iTodo[] = [];
    constructor(private skygear: SkygearSdk){
        super()
        this.set("message", "Fetching todos...")
        this.getTodos();
    }

    launchAction(){
        const promptOptions = {
            title: "Create Todo",
            message: "Type in the task you want to remember",
            okButtonText: "Ok",
            cancelButtonText: "Cancel",
            defaultText: "Create a todo",
            inputType: "text" // text, password, or email
        };
        prompt(promptOptions).then((r) => {
            console.log("Dialog result: ", r.result);
            console.log("Text: ", r.text);
            if (r.result){
                this.createTodo(r.text);
            } else {
                alert("Action Cancelled")
            }

        });
    }

    otherAction(tapEvent: ItemEventData){
        const actionOptions: ActionOptions = {
            title: "Update Todo List",
            message: "what would you like to do",
            cancelButtonText: "Cancel",
            actions: ["Edit Task","Mark as done", "Delete"],
            cancelable: true // Android only
        };

        action(actionOptions).then((result) => {
            if (result === "Edit Task") {
                this.editTask(tapEvent);
            } else if (result === "Mark as done") {
                this.markAsRead(tapEvent)
            } else if (result === "Delete") {
               this.removeTodo(tapEvent)
            }
        });
    }

    async getTodos() {
        try {
          let result = await this.skygear.db.getCollection("todo");
          this.set("todos", result);
          this.set("message", "Fetched Todos")
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

    async createTodo(todo: string) {
        try {
          let task = new Todo(todo, false);
          let result:any = await this.skygear.db.savePrivateRecord(task)
          let newTodos = this.todos.concat(result)
          this.set("todos", newTodos)
          alert(`${todo} created`)
        } catch (error) {
          console.log(error);
        }
      }

    async removeTodo(args: ItemEventData) {
        try {
          const index = args.index;
          const id = this.todos[index]._id;
          await this.skygear.db.deletePrivateRecord("todo", id)
          this.set("message", "todo deleted");
          let newTodo = this.todos.filter(todo => todo._id !== id)
        this.set("todos", newTodo);
          alert("Item Deleted");
        } catch (e) {
          alert(e.message)
        }
      }

     editTask(args: ItemEventData){
        const promptOptions = {
            title: "Edit Todo",
            message: "Type in desired task description",
            okButtonText: "Ok",
            cancelButtonText: "Cancel",
            defaultText: "Edit a todo",
            inputType: "text" // text, password, or email
        };
        prompt(promptOptions).then(async (r) => {
            if (r.result){
                try {
                    const index = args.index;
                    const todo = this.todos[index];
                    todo.task = r.text;
                    let result:any = await this.skygear.db.updatePrivateRecord(todo, todo._id)
                    let newTodo = this.todos
                    .filter(todo => todo._id !== result._id)
                    this.set("todos", [result].concat(newTodo));
                    alert("Item Updated");
                  } catch (e) {
                    alert(e.message)
                  }
            } else {
                alert("Action Cancelled")
            }

        });
    }

    async markAsRead(args: ItemEventData){
        try {
            const index = args.index;
            const todo = this.todos[index];
            todo.completed = true;
            let result: any = await this.skygear.db.updatePrivateRecord(todo, todo._id)
            let newTodo = this.todos
            .filter(todo => todo._id !== result._id)
            .concat(result);

            this.set("todos", newTodo);
            alert("Item Updated");
          } catch (e) {
            alert(e.message)
          }
    }
}