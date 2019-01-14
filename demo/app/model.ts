import { iSkyRecord } from "nativescript-skygear-sdk";

export interface iTodo extends iSkyRecord {
    readonly recordType: "todo";
    task: string;
    completed: boolean;
}

export class Todo implements iTodo {
    readonly recordType = "todo";
    task: string;
    completed: boolean;

    constructor(task: string, completed: boolean){
        this.task = task;
        this.completed = completed
    }
}