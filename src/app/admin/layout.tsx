import { InitializeToast, Loading, Toast } from "@/components";
import { BlankLayout } from "@/components/templates";
import { ToastProvider } from "@/context";
import React, { Suspense } from "react";

function AdminLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading size="lg" />}>
          <ToastProvider>
            <InitializeToast />
            <BlankLayout>{children}</BlankLayout>
            <Toast />
          </ToastProvider>
        </Suspense>
      </body>
    </html>
  );
}

export default AdminLayout;
