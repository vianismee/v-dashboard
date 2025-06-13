"use client";

import * as React from "react";
import {
  Blocks,
  Bell,
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

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

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
      title: "Information",
      url: "/information",
      icon: Bell,
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
  const [isDark, setIsDark] = useState<boolean>(false);
  const { userProfile } = useFetchUser();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  console.log(isDark);

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="py-5 flex items-center justify-center">
        <Image
          src={`${isDark ? "/dark.svg" : "/light.svg"}`}
          alt="logo"
          height={130}
          width={130}
        />
      </SidebarHeader>
      <SidebarContent className="mt-6">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {userProfile && userProfile.length > 0 ? (
          <NavUser user={userProfile[0]}></NavUser>
        ) : (
          <p>Loading User</p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
