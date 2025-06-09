"use client";

import * as React from "react";
import {
  Blocks,
  Calendar,
  Home,
  NotebookPen,
  Weight,
  MessageCircleQuestion,
  Settings2,
  Trash2,
  TypeOutline,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useFetchUser } from "@/api/useFetchUser";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

// This is sample data.
const data = {
  user: {
    name: "Vian",
    jabatan: "Designer",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Text Generator",
      url: "/generator",
      icon: TypeOutline,
    },
    {
      title: "Converter",
      url: "/converter",
      icon: Weight,
    },
    {
      title: "Note",
      url: "/note",
      icon: NotebookPen,
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userProfile } = useFetchUser();

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="py-5 flex items-center justify-center">
        <div>Kitoshindo</div>
      </SidebarHeader>
      <SidebarContent className="mt-6">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        {userProfile && userProfile.length > 0 ? (
          <NavUser user={userProfile[0]}></NavUser>
        ) : (
          <p>Loading User</p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
