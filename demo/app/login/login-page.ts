import {skygearSdk} from "../sdk"
import { EventData, Page } from "tns-core-modules/ui/page/page";
import { LoginVM } from "./login-vm";

export function onPageLoaded(args: EventData){
    let page: Page = <Page>args.object;
    page.bindingContext = new LoginVM(skygearSdk);
}