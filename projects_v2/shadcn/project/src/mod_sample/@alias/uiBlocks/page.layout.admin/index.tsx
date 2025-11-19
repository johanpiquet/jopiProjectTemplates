import { AppSidebar } from "../../../components/app-sidebar.tsx";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/shared/components/ui/breadcrumb";
import { Separator } from "@/shared/components/ui/separator";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/shared/components/ui/sidebar";
import React, {type JSX} from "react";
import {useMatchingMenuItem, useSendRouterLocationUpdateEvent} from "jopi-rewrite/uikit";

function MyBreadcrumb() {
    const menuItem = useMatchingMenuItem();

    if (!menuItem) return;
    const baseKey = menuItem.reactKey!;

    const B = menuItem.breadcrumb;

    if (typeof(B) === "function") {
        return <B />
    } else if (B instanceof Array) {
        const list = [...B];
        let lastTitle = list.pop();

        const titles: JSX.Element[] = [];

        list.forEach((title) => {
            titles.push(<BreadcrumbItem key={baseKey + titles.length} className="hidden md:block">
                <BreadcrumbLink>{title}</BreadcrumbLink>
            </BreadcrumbItem>);

            titles.push(<BreadcrumbSeparator key={baseKey + titles.length} className="hidden md:block" />)
        });

        titles.push(<BreadcrumbItem key={baseKey + titles.length}><BreadcrumbPage>{lastTitle}</BreadcrumbPage></BreadcrumbItem>)

        return <Breadcrumb>
            <BreadcrumbList>{titles}</BreadcrumbList>
        </Breadcrumb>
    }

    return null;
}

function Layout({children}: { children: React.ReactNode}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <MyBreadcrumb />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default function({children}: { children: React.ReactNode}) {
    // Will send the event "app.router.locationUpdated".
    useSendRouterLocationUpdateEvent();

    return <Layout>{children}</Layout>;
}
