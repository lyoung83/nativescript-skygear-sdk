import { iSkyRecord } from "nativescript-skygear-sdk";

export class Todo implements iSkyRecord {
    readonly recordType = "todo";
    task: string;
    completed: boolean;

    constructor(task: string, completed: boolean){
        this.task = task;
        this.completed = completed
    }
}