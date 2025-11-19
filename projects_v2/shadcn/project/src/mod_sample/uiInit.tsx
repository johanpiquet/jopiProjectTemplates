import {UiKitModule, MenuName} from "jopi-rewrite/uikit";
import {isBrowser} from "jopi-toolkit/jk_what";
import testHelloEvent from "@/events/test.hello";

import {AudioWaveform, Command, Frame, GalleryVerticalEnd, SquareTerminal} from "lucide-react";

// Note: the default class received is "ModuleInitContext"
// but ui-kit overrides the creation step to provide an instance of UiKitModule.
//
export default function(myModule: UiKitModule) {
    if (isBrowser) {
        myModule.events.enableEventSpying((name, e) => {
            //console.log(`Event spy - ${name}`, e);
        });
    }

    testHelloEvent.send({});

    myModule.addUiInitializer(() => {
        console.log('Module A - UI initialized (Default)');
    });

    const menuManager = myModule.getMenuManager();

    menuManager.addMenuBuilder(MenuName.LEFT_MENU, (leftMenu) => {
        // The menu builders are called each time user roles are updated.
        // Which includes login/logout.
        //
        myModule.ifUserHasRoles(["admin"], () => {
            leftMenu.selectItem(["My roles", "Role Admin"]).value = {url: "/role/admin"};
        });

        myModule.ifUserHasRoles(["writer"], () => {
            leftMenu.selectItem(["My roles", "Role Writer"]).value = {url: "/role/writer"};
        });
    });

    menuManager.addMenuBuilder("favorites", (projectsMenu) => {
        projectsMenu.append({key: "Home", url: "/", icon: Frame});
    });

    menuManager.addMenuBuilder("teams", (teamsMenu) => {
        teamsMenu.append({key: "Acme 1", url: "#", icon: GalleryVerticalEnd, plan: "Plan 1"});
        teamsMenu.append({key: "Acme 2", url: "#", icon: AudioWaveform, plan: "Plan 2"});
        teamsMenu.append({key: "Acme 3", url: "#", icon: Command, plan: "Plan 3"});
    });

    menuManager.addMenuBuilder(MenuName.LEFT_MENU, (leftMenu) => {
        leftMenu.append({
            key: "Features",
            icon: SquareTerminal,
            items: [
                {key: "Forms", url: "/features/forms"},
                {key: "Tests", url: "/features/tests"}
            ]
        });
    });

    myModule.events.addListener("user.infosUpdated", () => {
        myModule.ifUserHasRoles(["admin", "writer"], () => {
            // alert("has the roles [\"admin\", \"writer\"]")
        })
    });
}