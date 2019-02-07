import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { Page } from "tns-core-modules/ui/page";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application/application";
import { getFrameById } from "tns-core-modules/ui/frame/frame";


export function onLoad(){
    alert("Welcome! \n Click 'OK' to get started")
}

export function navigateToMain(args: EventData) {
    // const button: Button = <Button>args.object;
    // const page: Page = button.page;
    const sideDrawer: RadSideDrawer = <RadSideDrawer>getRootView();
    const featuredFrame = getFrameById("root");
    featuredFrame.navigate({
        moduleName: "main/main-page",
        clearHistory: true
    });
    sideDrawer.closeDrawer()
}

export function navigateToTodos(args: EventData) {
    // const button: Button = <Button>args.object;
    // const page: Page = button.page;
    const sideDrawer: RadSideDrawer = <RadSideDrawer>getRootView();
    const featuredFrame = getFrameById("root");
    featuredFrame.navigate({
        moduleName: "todo/todos",
        clearHistory: true
    });
    sideDrawer.closeDrawer()
}

export function navigateToPubsub(args: EventData) {
    // const button: Button = <Button>args.object;
    // const page: Page = button.page;
    const sideDrawer: RadSideDrawer = <RadSideDrawer>getRootView();
    const featuredFrame = getFrameById("root");
    featuredFrame.navigate({
        moduleName: "pubsub/pubsub-page",
        clearHistory: true
    });
    sideDrawer.closeDrawer()
}

export function navigateToConversations(args: EventData) {
    // const button: Button = <Button>args.object;
    // const page: Page = button.page;
    const sideDrawer: RadSideDrawer = <RadSideDrawer>getRootView();
    const featuredFrame = getFrameById("root");
    featuredFrame.navigate({
        moduleName: "conversation/conversation-page",
        clearHistory: true
    });
    sideDrawer.closeDrawer()
}