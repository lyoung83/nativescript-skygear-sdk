declare var io: any, org: any, java: any;
import { RecordSaveResponse, QueryResponse, RecordFetchResponse, RecordDeleteResponse } from "./database-handlers";
import { ISkyRecord } from "../../skygear-sdk.common";
const Record = io.skygear.skygear.Record;
const Query = io.skygear.skygear.Query;
const SKYDatabase = io.skygear.skygear.Database;
const Map = java.util.HashMap;
const Bool = java.lang.Boolean;
const reservedKeys = ["_id", "_type", "_recordType", "_recordID", "_created_at", "_updated_at", "_ownerID", "_created_by", "_updated_by", "_access", "_deleted", "_transient"];

export class Database {
    private readonly PUBLIC_DATABASE_NAME = "_public";
    private readonly PRIVATE_DATABASE_NAME = "_private";
    private private;
    private public;
    constructor(skygear) {
        this.prepareDB(skygear);
    }

    private sliceId(id: string) {
        let uuid = id.split("/");
        if (uuid.length === 1) {
            return uuid[0];
        } else {
            return uuid[1];
        }
    }

    private prepareDB(skygear) {
        this.private = new SKYDatabase(this.PRIVATE_DATABASE_NAME, skygear);
        this.public = new SKYDatabase(this.PUBLIC_DATABASE_NAME, skygear);
        return;
    }

    private createMap(record) {
        const map = new Map();
        const included = (key: string) => reservedKeys.some(reservedKey => reservedKey === key);

        for (const key in record) {
            if (record.hasOwnProperty(key) && !included(key)) {
                if (typeof record[key] === "boolean") {
                    map.put(key, Bool.valueOf(record[key]));
                } else {
                    map.put(key, record[key]);
                }
            }
        }
        return map;
    }

    getPublicDatabase() {
        return this.public;
    }

    getPrivateDatabase() {
        return this.private;
    }

    async savePrivateRecord(record: ISkyRecord) {
        try {
            let map = await this.createMap(record);
            let recordToSave = new Record(record.recordType, map);
            return await new Promise((resolve, reject) => {
            let databaseHandler = new RecordSaveResponse(resolve, reject);
            this.private.save(recordToSave, databaseHandler);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    async savePublicRecord(record: ISkyRecord) {
        try {
            let map = await this.createMap(record);
            let recordToSave = new Record(record.recordType, map);
            return await new Promise((resolve, reject) => {
                let databaseHandler = new RecordSaveResponse(resolve, reject);
                this.public.save(recordToSave, databaseHandler);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    async getCollection(recordType: string) {
        try {
            return await new Promise((resolve, reject) => {
                let query = new Query(recordType);
                let databaseHandler = new QueryResponse(resolve, reject);
                this.private.query(query, databaseHandler);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    async getUsers() {
        try {
            return await new Promise((resolve, reject) => {
                let query = new Query("user");
                let databaseHandler = new QueryResponse(resolve, reject);
                this.public.query(query, databaseHandler);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }
    async getPrivateRecord(recordType: string, id: string) {
        try {
            return await new Promise((resolve, reject) => {
                let query = new Query(recordType)
                    .equalTo("_id", this.sliceId(id));
                let databaseHandler = new RecordFetchResponse(resolve, reject);
                this.private.query(query, databaseHandler);
            });
        } catch ({ message: error }) {
            return { error };
        }

    }

    async getPublicRecord(recordType: string, id: string) {
        try {
            return await new Promise((resolve, reject) => {
                let query = new Query(recordType)
                    .equalTo("_id", this.sliceId(id));
                let databaseHandler = new RecordFetchResponse(resolve, reject);
                this.public.query(query, databaseHandler);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    async updatePrivateRecord(record: ISkyRecord, id: string) {
        try {
            return await new Promise((resolve, reject) => {
                let map = this.createMap(record);
                let updatedRecord = new Record(record.recordType, this.sliceId(id), map);
                let databaseHandler = new RecordSaveResponse(resolve, reject);
                this.private.save(updatedRecord, databaseHandler);
            });

        } catch ({ message: error }) {
            return { error };
        }
    }

    async updatePublicRecord(record: ISkyRecord, id: string) {
        try {
            return await new Promise((resolve, reject) => {
                let map = this.createMap(record);
                let updatedRecord = new Record(record.recordType, this.sliceId(id), map);
                let databaseHandler = new RecordSaveResponse(resolve, reject);
                this.public.save(updatedRecord, databaseHandler);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    async deletePrivateRecord(recordType: string, id: string) {
        try {
            return await new Promise((resolve, reject) => {
                let recordToDelete = new Record(recordType, this.sliceId(id), null);
                let databaseHandler = new RecordDeleteResponse(resolve, reject);
                this.private.delete(recordToDelete, databaseHandler);
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    async deletePublicRecord(recordType: string, id: string) {
        try {
            return await new Promise((resolve, reject) => {
            let recordToDelete = new Record(recordType, this.sliceId(id), null);
            let databaseHandler = new RecordDeleteResponse(resolve, reject);
            this.private.delete(recordToDelete, databaseHandler);
            });

        } catch ({ message: error }) {
            return { error };
        }
    }
}