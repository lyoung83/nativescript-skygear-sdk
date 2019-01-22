import { EventData } from "tns-core-modules/data/observable/observable";
import { Page } from "tns-core-modules/ui/page/page";
import { skygearSdk } from "~/sdk";
import { ConversationPage } from "./conversation-page-view-model";

export function pageLoaded(args: EventData){
    let page: Page = <Page>args.object;
    page.bindingContext = new ConversationPage(skygearSdk)
}