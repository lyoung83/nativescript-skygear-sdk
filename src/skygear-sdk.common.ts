import { Observable } from 'tns-core-modules/data/observable';
/**
 * interface for initalizing the skygear plugin.
 */
export interface ISkyConfig {
  address: string;
  apiKey: string;
}

/**
 * Required record interface for saving data into the Skygear database
 * meant to be implemented by class or extended by an interface.
 * @example class NewClass implements iSkyRecord {}
 */
export interface ISkyRecord {
  _id?: any;
  _created_at?: any;
  _updated_at?: any;
  _created_by?: string;
  _updated_by?: string;
  _ownerID?: string;
  recordType: string;
}

const APP_VERSION = "0.0.1";

export class Common extends Observable {

  constructor() {
    super();
  }

  public version() {
    return APP_VERSION;
  }
}