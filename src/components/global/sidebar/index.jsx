"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  Home,
  Calendar,
  ShoppingBag,
  Megaphone,
  Settings,
  Search,
  Inbox,
  HelpCircle,
  History,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

export default function AdminSidebar() {
  return (
    <Sidebar className="w-64 bg-white text-gray-900 border-r border-gray-200 dark:bg-zinc-950 dark:text-gray-100 dark:border-zinc-800">
      {/* ------------ HEADER ------------- */}
      <SidebarHeader className="p-3 border-b border-gray-200 dark:border-zinc-800">
        <img src="/logo.png" />
      </SidebarHeader>

      {/* ------------ SEARCH / INBOX ------------- */}
      <SidebarContent className="px-3 py-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800">
                <Search className="h-4 w-4" /> Search
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800">
                <Inbox className="h-4 w-4" /> Inbox
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* ------------ MAIN NAV ------------- */}
        <SidebarGroup className="mt-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin"
                className="gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <Home className="h-4 w-4" /> Home
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/events"
                className="gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <Calendar className="h-4 w-4" /> Events
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/orders"
                className="gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <ShoppingBag className="h-4 w-4" /> Orders
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/broadcasts"
                className="gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <Megaphone className="h-4 w-4" /> Broadcasts
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/settings"
                className="gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <Settings className="h-4 w-4" /> Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* ------------ SUPPORT ------------- */}
        <SidebarGroup className="mt-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/support"
                className="gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <HelpCircle className="h-4 w-4" /> Support
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/changelog"
                className="gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <History className="h-4 w-4" /> Changelog
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ------------ FOOTER / USER ------------- */}
      <SidebarFooter className="border-t border-gray-200 dark:border-zinc-800 p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/admin-avatar.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">Erica</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  erica@example.com
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="h-4 w-4 mr-2 text-red-500" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
