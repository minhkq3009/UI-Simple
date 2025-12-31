"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import {
  Home,
  Info,
  RadioTower,
  ListChecks,
  BookOpenText,
  Headphones,
  ClipboardList,
  PieChart,
  LayoutGrid,
  Boxes,
  Shield,
} from "lucide-react";

type SidebarProps = {
  collapsed?: boolean;
};

export function Sidebar({ collapsed = false }: SidebarProps) {
  return (
    <aside
      className={`flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-[260px]"
      }`}
    >
      <div
        className={`flex items-center px-6 pt-5 pb-3 ${
          collapsed ? "justify-center" : "gap-2"
        }`}
      >
        <Image
          src="/assets/logo-letter.png"
          alt="EV Admin logo"
          width={28}
          height={28}
          className="h-7 w-7"
        />
        {!collapsed && (
          <Image
            src="/assets/logo-light-text.png"
            alt="EV Admin"
            width={96}
            height={24}
            className="h-6 w-auto"
          />
        )}
      </div>
      {!collapsed && (
        <div className="px-6 pb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
          Dashboard
        </div>
      )}

      <ProSidebar
        collapsed={collapsed}
        backgroundColor="#ffffff"
        rootStyles={{
          border: "none",
          color: "#9ca3af",
          "& .ps-menu-button": {
            borderRadius: "0.75rem",
            padding: "10px 14px",
            fontSize: "0.875rem",
            fontWeight: 500,
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              color: active ? "#0f6fff" : "#9ca3af",
              backgroundColor: active ? "#eff6ff" : "transparent",
              "&:hover": {
                backgroundColor: "#eff6ff",
                color: "#0f6fff",
              },
            }),
            icon: () => ({
              color: "#9ca3af",
              marginRight: "8px",
              fontSize: "16px",
            }),
            label: () => ({
              whiteSpace: "nowrap",
            }),
            SubMenuExpandIcon: () => ({
              color: "#9ca3af",
            }),
          }}
        >
          <div className="px-4">
            <SubMenu
              label="Dashboard"
              icon={<Home className="h-4 w-4" />}
              defaultOpen
            >
              <MenuItem active>Dashboard 1</MenuItem>
              <MenuItem component={<Link href="/dashboard-2" />}>
                Dashboard 2
              </MenuItem>
            </SubMenu>
          </div>

          <div className="mt-6 space-y-1 px-4">
            <MenuItem icon={<Info className="h-4 w-4" />}>Information</MenuItem>
            <MenuItem icon={<RadioTower className="h-4 w-4" />}>
              Station
            </MenuItem>
            <MenuItem icon={<ListChecks className="h-4 w-4" />}>
              Management
            </MenuItem>
            <MenuItem icon={<BookOpenText className="h-4 w-4" />}>
              Booking
            </MenuItem>
          </div>

          <div className="mt-8 px-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
            Components
          </div>

          <div className="mt-2 space-y-1 px-4">
            <MenuItem icon={<Headphones className="h-4 w-4" />}>Support</MenuItem>
            <MenuItem icon={<ClipboardList className="h-4 w-4" />}>
              Features
            </MenuItem>
            <MenuItem icon={<PieChart className="h-4 w-4" />}>
              Forms &amp; Charts
            </MenuItem>
            <MenuItem icon={<LayoutGrid className="h-4 w-4" />}>
              Tables
            </MenuItem>
            <MenuItem icon={<Boxes className="h-4 w-4" />}>
              Apps &amp; Widgets
            </MenuItem>
          </div>

          <div className="mt-8 px-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
            Login &amp; Error
          </div>

          <div className="mt-2 px-4">
            <MenuItem icon={<Shield className="h-4 w-4" />}>
              Authentication
            </MenuItem>
          </div>
        </Menu>
      </ProSidebar>
    </aside>
  );
}

