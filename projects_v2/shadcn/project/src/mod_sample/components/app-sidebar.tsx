import * as React from "react"

import { NavMain } from "./nav-main.tsx"
import { NavFavorites } from "./nav-favorites.tsx"
import { NavUser } from "./nav-user.tsx"
import { TeamSwitcher } from "./team-switcher.tsx"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/shared/components/ui/sidebar"
import {type MenuItem, MenuName, useRouterNavigate, useUserInfos} from "jopi-rewrite/uikit";
import {LogIn} from "lucide-react";
import * as jk_events from "jopi-toolkit/jk_events";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useUserInfos();
    const navigate = useRouterNavigate();

    const onLoginClick = () => {
        const currentUrl = location.pathname + location.search;
        navigate(`/login?returnUrl=${encodeURIComponent(currentUrl)}`);
    };

    const handleLinkClick = (menuItem: MenuItem, menuName: string) => {
        jk_events.sendEvent("app.menu.click", {menuName, menuItem});
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain onClick={(item) => handleLinkClick(item, MenuName.LEFT_MENU)}/>
                <NavFavorites />
            </SidebarContent>
            <SidebarFooter>
                {user ?
                    <NavUser user={user} /> :
                    <div onClick={onLoginClick}
                         className="flex gap-4 justify-center cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-1">
                        <LogIn/>Log in
                    </div>
                }
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
