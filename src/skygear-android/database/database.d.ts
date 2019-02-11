import { ISkyRecord } from "../../skygear-sdk.common";
export declare class Database {
    private readonly PUBLIC_DATABASE_NAME;
    private readonly PRIVATE_DATABASE_NAME;
    private private;
    private public;
    constructor(skygear: any);
    private response(worker);
    private sliceId(id);
    private prepareDB(skygear);
    private createMap(record);
    getPublicDatabase(): any;
    getPrivateDatabase(): any;
    savePrivateRecord(record: ISkyRecord): Promise<{}>;
    savePublicRecord(record: ISkyRecord): Promise<{}>;
    getCollection(recordType: string): Promise<{}>;
    getUsers(): Promise<{}>;
    getPrivateRecord(recordType: string, id: string): Promise<{}>;
    getPublicRecord(recordType: string, id: string): Promise<{}>;
    updatePrivateRecord(record: ISkyRecord, id: string): Promise<{}>;
    updatePublicRecord(record: ISkyRecord, id: string): Promise<{}>;
    deletePrivateRecord(recordType: string, id: string): Promise<{}>;
    deletePublicRecord(recordType: string, id: string): Promise<{}>;
}
