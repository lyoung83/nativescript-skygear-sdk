import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';

export interface iSkyConfig {
  address: string;
  apiKey: string
}

/**
 * Required record interface for saving data into the Skygear database
 * meant to be implemented by class
 * @example class NewClass implements iSkyRecord {}
 */
export interface iSkyRecord {
  _id?: any;
  _created_at?: any;
  _updated_at?: any;
  _created_by?: string;
  _updated_by?: string;
  _ownerID?: string;
  recordType: string;
}

export class Common extends Observable {
  public message: string;

  constructor() {
    super();
    this.message = Utils.SUCCESS_MSG();
  }

  public greet() {
    return "Hello, NS";
  }
}

export class Utils {
  public static SUCCESS_MSG(): string {
    let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}.`;

    setTimeout(() => {
      dialogs.alert(`${msg} For real. It's really working :)`).then(() => console.log(`Dialog closed.`));
    }, 2000);

    return msg;
  }
}
