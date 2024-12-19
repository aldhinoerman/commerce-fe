"use client"
import React from "react";

function BlankLayout({ children }: React.PropsWithChildren) {
  return <main>{children}</main>;
}

export default BlankLayout;
