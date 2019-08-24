declare const SKYRecord: any, SKYRecordID: any, SKYQuery: any;
import * as utils from "tns-core-modules/utils/utils";
import { serializeResult, serializeError } from "../";
import { ISkyRecord } from "../../skygear-sdk.common";

/**
 * Class and methods for interacting with the Skygear database instanced as part of the skygear container.
 */
export class Database {
    private public: any;
    private private: any;
    constructor(skygear) {
        this.public = skygear.publicCloudDatabase;
        this.private = skygear.privateCloudDatabase;
    }

    private returnRecord = (res, rej) => (record, err) => {
        try {
            let result: any = serializeResult(record);
            let error = serializeError(err);
            if (err) {
                rej(error)
                return true;
            }
            res(result);
            return true;
        } catch ({ message: error }) {
            rej(error);
            return { error };
        }
    }

    private returnCollection = (res, rej) => (records, err) => {
        try {
            let newArray = utils.ios.collections.nsArrayToJSArray(records);
            let result: any[] = newArray.map(item => serializeResult(item));
            let error = serializeError(err);
            if (err) {
                rej(error)
                return true;
            }
            res(result);
            return true
        } catch ({ message: error }) {
            rej(error);
            return { error };
        }


    }

    private sliceId(id: string) {
        let uuid = id.split("/");
        if (uuid.length === 1) {
            return uuid[0];
        } else {
            return uuid[1];
        }
    }

    private createDictionary(record) {
        const values = [];
        let dict;
        for (const key in record) {
            if (record.hasOwnProperty(key)) {
                values.push(record[key]);
            }
        }
        dict = NSDictionary.dictionaryWithObjectsForKeys(values, Object.keys(record));
        return dict;
    }

    /**
     * Get the public database object for directly calling methods against it.
     */
    getPublicDatabase() {
        return this.public;
    }

    /**
 * Get the private database object for directly calling methods against it.
 */
    getPrivateDatabase() {
        return this.private;
    }
    /**
     *  Saves a record for the current user of the instantiated container.
     * @param record instance of the record to create using the SKYRecord interface
     * @example skygearInstance.db.savePrivateRecord(iSkygearImplementedClass)
     * @returns Promise
     */
    async savePrivateRecord(record: ISkyRecord) {
        try {
            let skyRecord = await SKYRecord.recordWithRecordTypeNameData(record.recordType, null, record);
            return await new Promise<any>((resolve, reject) => {
             this.private.saveRecordCompletion(skyRecord, this.returnRecord(resolve, reject));
             });
        } catch ({ message: error }) {
            return { error };
        }
    }

    /**
     * Saves a record to the public database
     * @param record instance of the record to create using the SKYRecord interface
     * @example skygearInstance.db.savePrivateRecord(iSkygearImplementedClass)
     * @returns Promise
     */
    async savePublicRecord(record: ISkyRecord) {
        try {
            let skyRecord = await SKYRecord.recordWithRecordTypeNameData(record.recordType, null, record);
            return await new Promise<any>((resolve, reject) => {
             this.public.saveRecordCompletion(skyRecord, this.returnRecord(resolve, reject));
            });
        } catch ({ message: error }) {
            return { error };
        }
    }
    /**
     * Return entire collection of user records for a given record type.
     * @param recordType string name of the type of the record collection.
     * @returns Promise
     * @example skygearInstance.db.getCollection("recordType")
     */
    async getCollection(recordType: string) {
        try {
            let query = await SKYQuery.queryWithRecordTypePredicate(recordType, null);
            return await new Promise<any>((resolve, reject) => {
                this.private.performQueryCompletionHandler(query, this.returnCollection(resolve, reject));
            });
        } catch ({ message: error }) {
            return { error };
        }

    }
    /**
     * Return collection of users on the skygear instance.
     * @returns Promise
     * @example skygearInstance.db.getUsers()
     */
    async getUsers() {
        try {
            let query = await SKYQuery.queryWithRecordTypePredicate("user", null);
            return await new Promise<any>((resolve, reject) => {
                this.public.performQueryCompletionHandler(query, this.returnCollection(resolve, reject));
            });
        } catch ({ message: error }) {
            return { error };
        }

    }

    /**
     * Fetch record from private database with a given record type and id
     * @param recordType string name of the type of the record collection.
     * @param id id of the record to fetch.
     * @returns Promise
     * @example skygearInstance.database.getPrivateRecord("todo", "todo/B9EB77B4-C989-4C25-AF42-AA1CF549F4E7")
     */
    async getPrivateRecord(recordType: string, id: string) {
        try {
            let recordId = SKYRecordID.recordIDWithRecordTypeName(recordType, this.sliceId(id));
            return await new Promise<any>((resolve, reject) => {
             this.private.fetchRecordWithIDCompletionHandler(recordId, this.returnRecord(resolve, reject));
            });
        } catch ({ message: error }) {
            return { error };
        }
    }
    /**
     * Fetch a record from the public database with a given record type and id
     * @param recordType string name of the type of the record collection.
     * @param id id of the record to fetch.
     */
    async getPublicRecord(recordType: string, id: string) {
        try {
            let recordId = SKYRecordID.recordIDWithRecordTypeName(recordType, this.sliceId(id));
            return await new Promise<any>((resolve, reject) => {
             this.public.fetchRecordWithIDCompletionHandler(recordId, this.returnRecord(resolve, reject));
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    /**
     * Update a record within the private database.
     * @param record the record with updated values
     * @param id the record id to update.
     * @returns
     */
    async updatePrivateRecord(record: ISkyRecord, id: string) {
        try {
            let dictionary = await this.createDictionary(record);
            let modifiedRecord = SKYRecord.recordWithRecordTypeNameData(record.recordType, this.sliceId(id), dictionary);
            return await new Promise<any>((resolve, reject) => {
                this.private.saveRecordCompletion(modifiedRecord, this.returnRecord(resolve, reject));
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    /**
     * Update a record within the public database.
     * @param record the record with updated values
     * @param id the record id to update.
     */
    async updatePublicRecord(record: ISkyRecord, id: string) {
        try {
            let dictionary = await this.createDictionary(record);
            let modifiedRecord = SKYRecord.recordWithRecordTypeNameData(record.recordType, this.sliceId(id), dictionary);
            return await new Promise<any>((resolve, reject) => {
                this.public.saveRecordCompletion(modifiedRecord, this.returnRecord(resolve, reject));
            });
        } catch ({ message: error }) {
            return { error };
        }
    }

    /**
     * Remove a record from the private database.
     * @param recordType the record type to find
     * @param id the id of the record
     */
    async deletePrivateRecord(recordType: string, id: string) {
        try {
            let recordId = SKYRecordID.recordIDWithRecordTypeName(recordType, this.sliceId(id));
            await this.private.deleteRecordWithIDCompletionHandler(recordId, null);
            return { message: "ok" };
        } catch ({ message: error }) {
            return { error };
        }
    }

    /**
     * Remove a record from the public database.
     * @param recordType the record type to find
     * @param id the id of the record
     */
    async deletePublicRecord(recordType: string, id: string) {
        try {
            let recordId = SKYRecordID.recordIDWithRecordTypeName(recordType, this.sliceId(id));
            await this.public.deleteRecordWithIDCompletionHandler(recordId, null);
            return { message: "ok" };
        } catch ({ message: error }) {
            return { error };
        }
    }
}