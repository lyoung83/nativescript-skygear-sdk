import * as observable from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { skygearSdk } from '../sdk';
import {HelloWorldModel} from './main-view-model';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from 'tns-core-modules/application/application';


// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    let page = <Page>args.object;
    page.bindingContext = new HelloWorldModel(skygearSdk);
}

export function showSideDrawer(args: observable.EventData){
    const drawer: RadSideDrawer = <RadSideDrawer>getRootView()
    drawer.showDrawer();
}
