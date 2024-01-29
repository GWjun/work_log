"use client";
import React from "react";
import { AppProvider } from "@/context/context";

import User from "@/components/User";

export default function Home() {
  return (
    <AppProvider>
      <User />
    </AppProvider>
  );
}
