import { iSkyRecord } from "../../skygear-sdk.common";
export declare class Database {
    private public;
    private private;
    constructor(skygear: any);
    private spawnWorker();
    private response;
    private returnRecord;
    private returnCollection;
    private sliceId(id);
    private createDictionary(record);
    getPublicDatabase(): any;
    getPrivateDatabase(): any;
    savePrivateRecord(record: iSkyRecord): Promise<iSkyRecord | iSkyRecord[] | {
        error: any;
    }>;
    savePublicRecord(record: iSkyRecord): Promise<iSkyRecord | iSkyRecord[] | {
        error: any;
    }>;
    getCollection(recordType: string): Promise<iSkyRecord | iSkyRecord[] | {
        error: any;
    }>;
    getUsers(): Promise<iSkyRecord | iSkyRecord[] | {
        error: any;
    }>;
    getPrivateRecord(recordType: string, id: string): Promise<iSkyRecord | iSkyRecord[] | {
        error: any;
    }>;
    getPublicRecord(recordType: string, id: string): Promise<iSkyRecord | iSkyRecord[] | {
        error: any;
    }>;
    updatePrivateRecord(record: iSkyRecord, id: string): Promise<iSkyRecord | iSkyRecord[] | {
        error: any;
    }>;
    updatePublicRecord(record: iSkyRecord, id: string): Promise<iSkyRecord | iSkyRecord[] | {
        error: any;
    }>;
    deletePrivateRecord(recordType: string, id: string): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    deletePublicRecord(recordType: string, id: string): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
}
