declare var SKYRecord: any, SKYRecordID: any, SKYQuery: any;
import * as utils from "tns-core-modules/utils/utils";
import { serializeResult, serializeError } from "../";
import { iSkyRecord } from "../../skygear-sdk.common";
var databaseWorker = new Worker('../result-worker');



/**
 * Class and methods for interacting with the Skygear database instanced as part of the skygear container.
 */
export class Database {
    private public: any;
    private private: any;
    constructor(skygear) {
        this.public = skygear.publicCloudDatabase;
        this.private = skygear.privateCloudDatabase;
        console.log({ public: this.public, private: this.private })
    }

    private response = () => new Promise((resolve, reject) => {
        databaseWorker.onmessage = (msg) => {
            if (msg.data.res === "success") {
                resolve(msg.data.result)
            } else {
                reject(new Error("Operation Failed"));
            }
        };

        databaseWorker.onerror = error => {
            console.log(error);
            reject({ error });
        };
    });

    private returnRecord(record, err) {
        try {
            let result = serializeResult(record);
            let error = serializeError(err);
            return databaseWorker.postMessage({ result, error });
        } catch ({ message: error }) {
            return { error }
        }
    }

    private returnCollection(records, err) {
        try {
            let newArray = utils.ios.collections.nsArrayToJSArray(records);
            let result = newArray.map(item => serializeResult(item));
            let error = serializeError(err);
            return databaseWorker.postMessage({ result, error });
        } catch ({ message: error }) {
            return { error }
        }


    }

    private sliceId(id: string) {
        let uuid = id.split("/")
        if (uuid.length === 1) {
            return uuid[0]
        } else {
            return uuid[1]
        }
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
    async savePrivateRecord(record: iSkyRecord) {
        try {
            let skyRecord = await SKYRecord.recordWithRecordTypeNameData(record.recordType, null, record);
            console.log(skyRecord);
            await this.private.saveRecordCompletion(skyRecord, this.returnRecord);
            return this.response()
        } catch ({ message: error }) {
            return { error }
        }
    }

    /**
     * Saves a record to the public database
     * @param record instance of the record to create using the SKYRecord interface
     * @example skygearInstance.db.savePrivateRecord(iSkygearImplementedClass)
     * @returns Promise
     */
    async savePublicRecord(record: iSkyRecord) {
        try {
            let skyRecord = await SKYRecord.recordWithRecordTypeNameData(record.recordType, null, record);
            console.log(skyRecord);
            await this.public.saveRecordCompletion(skyRecord, this.returnRecord);

            return this.response()
        } catch ({ message: error }) {
            return { error }
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
            await this.private.performQueryCompletionHandler(query, this.returnCollection);

            return this.response();
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
            let query = await SKYQuery.queryWithRecordTypePredicate("users", null);
            await this.public.performQueryCompletionHandler(query, this.returnCollection);

            return this.response();
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
            await this.private.fetchRecordWithIDCompletionHandler(recordId, this.returnRecord);

            return this.response();
        } catch ({ message: error }) {
            return { error }
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
            await this.public.fetchRecordWithIDCompletionHandler(recordId, this.returnRecord);

            return this.response();
        } catch ({ message: error }) {
            return { error }
        }
    }

    /**
     * Update a record within the private database.
     * @param record the record with updated values
     * @param id the record id to update.
     * @returns
     */
    async updatePrivateRecord(record: iSkyRecord, id: string) {
        try {
            let recordToModify = await SKYRecord.recordWithRecordTypeName(record.recordType, this.sliceId(id));
            let modifiedRecord = await SKYRecord.recordWithRecordTypeNameData(record.recordType, null, record)
            await this.private.saveRecordCompletion(modifiedRecord, this.returnRecord);
            return this.response()
        } catch ({ message: error }) {
            return { error };
        }
    }

    /**
     * Update a record within the public database.
     * @param record the record with updated values
     * @param id the record id to update.
     */
    async updatePublicRecord(record: iSkyRecord, id: string) {
        try {
            let recordToModify = await SKYRecord.recordWithRecordTypeName(record.recordType, this.sliceId(id));
            let modifiedRecord = await SKYRecord.recordWithRecordTypeNameData(record.recordType, null, record)
            await this.public.saveRecordCompletion(modifiedRecord, this.returnRecord);
            return this.response();
        } catch ({ message: error }) {
            return { error };
        }
    };

    /**
     * Remove a record from the private database.
     * @param recordType the record type to find
     * @param id the id of the record
     */
    async deletePrivateRecord(recordType: string, id: string) {
        try {
            let recordId = SKYRecordID.recordIDWithRecordTypeName(recordType, this.sliceId(id));
            await this.private.deleteRecordWithIDCompletionHandler(recordId, null)
            return { message: "ok" };
        } catch ({ message: error }) {
            return { error }
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
            await this.public.deleteRecordWithIDCompletionHandler(recordId, null)
            return { message: "ok" };
        } catch ({ message: error }) {
            return { error }
        }
    }
}