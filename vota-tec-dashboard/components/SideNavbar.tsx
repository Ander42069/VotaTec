/** @format */
"use client";

import { MouseEventHandler, useState } from "react";
import { MouseEvent } from "react";
import { Nav } from "./ui/nav";
import axios from "axios";

type Props = {};

import {
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  LogOut,
  Vote
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size"; 
import { useRouter } from "next/navigation";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      if (res.status === 200) {
        // Redirecciona al login después de hacer logout
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  // Maneja el evento onClick del enlace de logout
  const handleLogoutClick: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    await handleLogout();
  };

  return (
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "default"
          },
          {
            title: "Admins",
            href: "/dashboard/admins",
            icon: UsersRound,
            variant: "ghost"
          },
          {
            title: "Votos",
            href: "/dashboard/votes",
            icon: Vote,
            variant: "ghost"
          },
          {
            title: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
            variant: "ghost"
          },
          {
            title: "Logout",
          
            icon: LogOut,
            variant: "ghost",
            onClick: handleLogoutClick
          },
          /*{
            title: "Test",
            
            icon: UsersRound,
            variant: "ghost",
            onClick: async () => {
              try {
                const res = await axios.get("/api/auth/profile");

                console.log(res);

                if (res.status === 200) {
                  window.location.href = "/";
                  console.log(res.data);
                }
              } catch (error) {
                console.error("Error:", error);
              }
            } // Add closing parenthesis here
          },*/
        ]}
      />
    </div>
  );
}