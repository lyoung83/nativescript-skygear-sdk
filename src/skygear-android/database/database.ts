declare var io: any, org: any, java: any;
import { RecordSaveResponse, databaseWorker, QueryResponse, RecordFetchResponse, RecordDeleteResponse } from "./database-handlers";
import { iSkyRecord } from "../../skygear-sdk.common";
var Record = io.skygear.skygear.Record;
var Query = io.skygear.skygear.Query;
var SKYDatabase = io.skygear.skygear.Database;
var Serializer = io.skygear.skygear.RecordSerializer;
var JSONObject = org.json.JSONObject;
var Map = java.util.HashMap;
var Bool = java.lang.Boolean;

export class Database {
    private readonly PUBLIC_DATABASE_NAME = "_public";
    private readonly PRIVATE_DATABASE_NAME = "_private";
    private private;
    private public;
    constructor(skygear) {
        this.prepareDB(skygear);
        console.log({ public: this.public, private: this.private })
    }

    private response(worker) {
        return new Promise((resolve, reject) => {
            worker.onmessage = (msg) => {
                if (msg.data.res === "success") {
                    resolve(msg.data.result);
                } else {
                    reject(new Error("Operation Failed"));
                }
            }
        })
    }

    private sliceId(id: string) {
        let uuid = id.split("/")
        if (uuid.length === 1) {
            return uuid[0]
        } else {
            return uuid[1]
        }
    }

    private prepareDB(skygear) {
        this.private = new SKYDatabase(this.PRIVATE_DATABASE_NAME, skygear);
        this.public = new SKYDatabase(this.PUBLIC_DATABASE_NAME, skygear);
        return;
    }

    private createMap(record) {
        var map = new Map();
        for (const key in record) {
            if (record.hasOwnProperty(key) && key !== "recordType") {
                if (typeof record[key] === "boolean"){
                    map.put(key, Bool.valueOf(record[key]))
                } else {
                    map.put(key, record[key])
                }
            }
        }
        return map
    }

    getPublicDatabase() {
        return this.public;
    }

    getPrivateDatabase() {
        return this.private;
    }

    async savePrivateRecord(record: iSkyRecord) {
        try {
            let map = await this.createMap(record);
            let recordToSave = new Record(record.recordType, map);
            let databaseHandler = new RecordSaveResponse();
            await this.private.save(recordToSave, databaseHandler);
            return this.response(databaseHandler.worker);
        } catch ({ message: error }) {
            return { error }
        }

    };

    async savePublicRecord(record: iSkyRecord) {
        try {
            let map = await this.createMap(record);
            let recordToSave = new Record(record.recordType, map);
            let databaseHandler = new RecordSaveResponse();
            await this.public.save(recordToSave, databaseHandler);
            return this.response(databaseHandler.worker);
        } catch ({ message: error }) {
            return { error }
        }
    };
    async getCollection(recordType: string) {
        try {
            let query = new Query(recordType);
            let databaseHandler = new QueryResponse();
            await this.private.query(query, databaseHandler);
            return this.response(databaseHandler.worker);
        } catch ({ message: error }) {
            return { error }
        }
    };

    async getUsers() {
        try {
            let query = new Query("user");
            let databaseHandler = new QueryResponse();
            await this.public.query(query, databaseHandler);
            return this.response(databaseHandler.worker);
        } catch ({ message: error }) {
            return { error }
        }
    }
    async getPrivateRecord(recordType: string, id: string) {
        try {
            let query = new Query(recordType)
                .equalTo("_id", this.sliceId(id));
            let databaseHandler = new RecordFetchResponse();
            await this.private.query(query, databaseHandler);
            return this.response(databaseHandler.worker);
        } catch ({ message: error }) {
            return { error }
        }

    };
    async getPublicRecord(recordType: string, id: string) {
        try {
            let query = new Query(recordType)
                .equalTo("_id", this.sliceId(id));
                let databaseHandler = new RecordFetchResponse();
            await this.public.query(query, databaseHandler);
            return this.response(databaseHandler.worker);
        } catch ({ message: error }) {
            return { error }
        }
    };
    async updatePrivateRecord(record: iSkyRecord, id: string) {
        try {
            let map = this.createMap(record)
            let updatedRecord = new Record(record.recordType, this.sliceId(id), map);
            let databaseHandler = new RecordSaveResponse();
            await this.private.save(updatedRecord, databaseHandler);
            return this.response(databaseHandler.worker);

        } catch ({ message: error }) {
            return { error }
        }
    };
    async updatePublicRecord(record: iSkyRecord, id: string) {
        try {
            let map = this.createMap(record)
            let updatedRecord = new Record(record.recordType, this.sliceId(id), map);
            let databaseHandler = new RecordSaveResponse();
            await this.public.save(updatedRecord, databaseHandler);
            return this.response(databaseHandler.worker);

        } catch ({ message: error }) {
            return { error }
        }
    };
    async deletePrivateRecord(recordType: string, id: string) {
        try {
            let recordToDelete = new Record(recordType, this.sliceId(id), null);
            let databaseHandler = new RecordDeleteResponse();
            await this.private.delete(recordToDelete, databaseHandler);
            return this.response(databaseHandler.worker);

        } catch ({ message: error }) {
            return { error }
        }
    };
    async deletePublicRecord(recordType: string, id: string) {
        try {
            let recordToDelete = new Record(recordType, this.sliceId(id), null);
            let databaseHandler = new RecordDeleteResponse();
            await this.private.delete(recordToDelete, databaseHandler);
            return this.response(databaseHandler.worker);

        } catch ({ message: error }) {
            return { error }
        }
    };
}