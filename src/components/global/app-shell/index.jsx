"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "@/store";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const AppShell = ({ children }) => {
  return (
    <Provider store={store}>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <div className="flex min-h-screen w-full">
          {/* Sidebar */}
          <AppSidebar variant="inset" />

          {/* Main content area */}
          <SidebarInset className="flex flex-1 flex-col min-w-0">
            <SiteHeader />
            <main className="flex-1 min-w-0">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </Provider>
  );
};

export default AppShell;
