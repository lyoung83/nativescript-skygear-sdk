import { EventData } from "tns-core-modules/data/observable/observable";
import { Page } from "tns-core-modules/ui/page/page";
import { skygearSdk } from "~/sdk";
import { ConversationPage } from "./conversation-page-view-model";
import { ItemEventData, ListView } from "tns-core-modules/ui/list-view/list-view";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application/application";

export function pageLoaded(args: EventData){
    let page: Page = <Page>args.object;
    page.bindingContext = new ConversationPage(skygearSdk)
}

export function goToItem(args: ItemEventData): void {
    const tappedItem = args.view.bindingContext;
    let list = <ListView>args.object
    let page = list.page;
    page.frame.navigate({
        moduleName: "messages/messages-page",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}

export function showSideDrawer(args: EventData){
    const drawer: RadSideDrawer = <RadSideDrawer>getRootView()
    drawer.showDrawer();
}