import { iSkyRecord } from "../../skygear-sdk.common";
export declare class Database {
    private public;
    private private;
    constructor(skygear: any);
    private response;
    private returnRecord(record, err);
    private returnCollection(records, err);
    private sliceId(id);
    getPublicDatabase(): any;
    getPrivateDatabase(): any;
    savePrivateRecord(record: iSkyRecord): Promise<{}>;
    savePublicRecord(record: iSkyRecord): Promise<{}>;
    getCollection(recordType: string): Promise<{}>;
    getUsers(): Promise<{}>;
    getPrivateRecord(recordType: string, id: string): Promise<{}>;
    getPublicRecord(recordType: string, id: string): Promise<{}>;
    updatePrivateRecord(record: iSkyRecord, id: string): Promise<{}>;
    updatePublicRecord(record: iSkyRecord, id: string): Promise<{}>;
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
