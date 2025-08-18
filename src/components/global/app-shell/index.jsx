"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <SidebarProvider>{children}</SidebarProvider>
    </Provider>
  );
};

export default Layout;
