import { ISkyRecord } from "nativescript-skygear-sdk";

export interface ITodo extends ISkyRecord {
    readonly recordType: "todo";
    task: string;
    completed: boolean;
}

export class Todo implements ITodo {
    readonly recordType = "todo";
    task: string;
    completed: boolean;

    constructor(task: string, completed: boolean) {
        this.task = task;
        this.completed = completed;
    }
}