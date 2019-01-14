import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { PubsubViewModel } from './pubsub-view-model';
import { skygearSdk } from "../sdk";


export function navigatingTo(args: EventData) {
	let page = <Page>args.object;
	page.bindingContext = new PubsubViewModel(skygearSdk);
}