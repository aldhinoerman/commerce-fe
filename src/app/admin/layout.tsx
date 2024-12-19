import { BlankLayout } from "@/components/templates";
import React from "react";

function AdminLayout({ children }: React.PropsWithChildren) {
  return <BlankLayout>{children}</BlankLayout>;
}

export default AdminLayout;
