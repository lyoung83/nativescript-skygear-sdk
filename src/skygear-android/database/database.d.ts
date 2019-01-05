import { iSkyRecord } from "../../skygear-sdk.common";
export declare class Database {
    private readonly PUBLIC_DATABASE_NAME;
    private readonly PRIVATE_DATABASE_NAME;
    private private;
    private public;
    constructor(skygear: any);
    private response();
    private sliceId(id);
    private prepareDB(skygear);
    private createMap(record);
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
    deletePrivateRecord(recordType: string, id: string): Promise<{}>;
    deletePublicRecord(recordType: string, id: string): Promise<{}>;
}
