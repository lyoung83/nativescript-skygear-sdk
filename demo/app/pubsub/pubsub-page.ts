import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { PubsubViewModel } from './pubsub-view-model';
import { skygearSdk } from "../sdk";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from 'tns-core-modules/application/application';


export function navigatingTo(args: EventData) {
  let page = <Page>args.object;
  page.bindingContext = new PubsubViewModel(skygearSdk);
}

export function showSideDrawer(args: EventData) {
  const drawer: RadSideDrawer = <RadSideDrawer>getRootView();
  drawer.showDrawer();
  let page = <Page>args.object;
  page.bindingContext = new PubsubViewModel(skygearSdk);
}