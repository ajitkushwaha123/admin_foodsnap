"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "@/components/ui/sonner";

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <Toaster richColors position="top-center" />
      <SidebarProvider>{children}</SidebarProvider>
    </Provider>
  );
};

export default Layout;
