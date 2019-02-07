import * as observable from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page/page';
import { TodoView } from './todos-view-model';
import { skygearSdk } from "~/sdk";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from 'tns-core-modules/application/application';


export function pageLoaded(args: observable.EventData) {
    let page:Page = <Page>args.object;
    page.bindingContext = new TodoView(skygearSdk);
}

export function showSideDrawer(args: observable.EventData){
    const drawer: RadSideDrawer = <RadSideDrawer>getRootView()
    drawer.showDrawer();
}