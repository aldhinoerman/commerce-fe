import { BlankLayout } from "@/components/templates";
import React from "react";

function LoginLayout({ children }: React.PropsWithChildren) {
  return <BlankLayout>{children}</BlankLayout>;
}

export default LoginLayout;
