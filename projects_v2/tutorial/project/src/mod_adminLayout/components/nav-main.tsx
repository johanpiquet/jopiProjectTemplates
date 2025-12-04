"use client"

import { ChevronRight } from "lucide-react"
import {MenuName, RouterLink, useMenu} from "jopijs/uikit";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/mod_shadcn/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/mod_shadcn/components/ui/sidebar"
import {type ReactMenuItem} from "jopijs/uikit";
import React from "react";

export function NavMain({onClick}: { onClick?: (subItem: ReactMenuItem, event: React.MouseEvent<HTMLAnchorElement>)=>void}) {
  const items = useMenu(MenuName.LEFT_MENU);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Category</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title} asChild
            defaultOpen={item.isActive === true}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} variant={item.isActive ? "active": undefined}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                        <RouterLink to={subItem.url||"#"}
                              onClick={(event) => onClick?.(subItem, event)}>{subItem.title}</RouterLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
