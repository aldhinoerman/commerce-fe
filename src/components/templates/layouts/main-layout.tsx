import React from "react";

function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center">{children}</main>
    </>
  );
}

export default MainLayout;
