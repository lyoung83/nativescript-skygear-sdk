import { iSkyRecord } from "../../skygear-sdk.common";
export declare class Database {
    private public;
    private private;
    constructor(skygear: any);
    private response;
    private returnRecord;
    private returnCollection;
    private sliceId(id);
    private createDictionary(record);
    getPublicDatabase(): any;
    getPrivateDatabase(): any;
    savePrivateRecord(record: iSkyRecord): Promise<any>;
    savePublicRecord(record: iSkyRecord): Promise<any>;
    getCollection(recordType: string): Promise<any>;
    getUsers(): Promise<any>;
    getPrivateRecord(recordType: string, id: string): Promise<any>;
    getPublicRecord(recordType: string, id: string): Promise<any>;
    updatePrivateRecord(record: iSkyRecord, id: string): Promise<any>;
    updatePublicRecord(record: iSkyRecord, id: string): Promise<any>;
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
