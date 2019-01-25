import { Page, EventData, NavigatedData } from "tns-core-modules/ui/page/page";
import { Button } from "tns-core-modules/ui/button";
import { Messages } from "./messages-page-view-model";
import { skygearSdk } from "~/sdk";
import { ItemEventData, ListView } from "tns-core-modules/ui/list-view/list-view";

export function onNavigatedTo(args: NavigatedData): void {
    let page = <Page>args.object;
    page.bindingContext = new Messages(page.navigationContext, skygearSdk)


}

export function onTap(args: EventData) {
    const button: Button = <Button>args.object;
    const page: Page = button.page;
    page.frame.goBack();
}

export function onListViewLoaded(args: ItemEventData){
    let listView: ListView = <ListView>args.object;
    let index = listView.items.length -1
    setTimeout(() => {
        listView.scrollToIndex(index);
    }, 200);
}