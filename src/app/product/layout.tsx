import { Footer, Header } from "@/components";
import React from "react";

function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex justify-center min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default ProductLayout;
