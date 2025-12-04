import {UiKitModule, MenuName} from "jopijs/uikit";
import {EventPriority} from "jopi-toolkit/jk_events";
import {Frame, GalleryVerticalEnd, SquareTerminal} from "lucide-react";

// > This file 'uiInit.tsx' (or .ts) is automatically called:
//      - When the navigator loads the first page.
//      - Each time the server renders a page.
//
// Each module can have a 'uiInit.tsx'.

export default function(myModule: UiKitModule) {
    // addUiInitializer adds a function called when all the modules are loaded.
    // "EventPriority.high" allows controlling the call order and being called before the default order.
    //
    myModule.addUiInitializer(EventPriority.high, () => {
        //console.log('Module A - UI initialized (Default)');
    });

    // Allows resolving icons from name.
    myModule.resolveIcon("SquareTerminal", SquareTerminal);
    myModule.resolveIcon("GalleryVerticalEnd", GalleryVerticalEnd);
    myModule.resolveIcon("Frame", Frame);

    // `myModule` allows accessing the main used things.
    // Here the menu manager.
    const menuManager = myModule.getMenuManager();

    // Here we add a function which will define the content
    // of the menu named "favorites".
    //
    // To know: A menu can be updated when the user login / logout.
    //          It's a must-have with SPA application (single page).
    //          This need is why we don't directly define the menu items
    //          but a function which will be called again when the user change.
    //
    menuManager.addMenuBuilder("favorites", (projectsMenu) => {
        projectsMenu.set(["Home"], {url: "/", icon: Frame});

        // Here we test the user role.
        // Only users with the "admin" role will see our menu entry.
        //
        myModule.ifUserHasRoles(["admin"], () => {
            projectsMenu.set(["Admin"], {url: "/admin", icon: Frame});
        });
    });

    // Same thing for the menu "teams".
    menuManager.addMenuBuilder("teams", (teamsMenu) => {
        teamsMenu.set(["Acme 1"], {url: "#", icon: GalleryVerticalEnd, plan: "Plan 1"});
        teamsMenu.set(["Acme 2"], {url: "#", icon: GalleryVerticalEnd, plan: "Plan 2"});
        teamsMenu.set(["Acme 3"], {url: "#", icon: GalleryVerticalEnd, plan: "Plan 3"});
    });

    // Declare a sub-menu
    //
    menuManager.addMenuBuilder(MenuName.LEFT_MENU, (leftMenu) => {
        leftMenu.set(["withSecondLevel", "Sub Menu 1"], {url: "/not-implemented-1"});
        leftMenu.set(["withSecondLevel", "Sub Menu 2"], {url: "/not-implemented-2"});
    });

    // Menu override allows changing the title and the order of a menu entry.
    const menu = myModule.getMenuOverride(MenuName.LEFT_MENU);

    // Here "withSecondLevel" is the menu entry key.
    // When no title is defined, the key is used as a title.
    // Here we want a more explicit title.
    // Also, we want to use an icon.
    menu.override(["withSecondLevel"], {title: "Menu with 2 levels", icon: "square"});
}