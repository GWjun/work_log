import React from "react";
import { AppProvider } from "@/context/context";

import Table from "@/components/Table";

export default function Home() {
  return (
    <AppProvider>
      <Table />
    </AppProvider>
  );
}
