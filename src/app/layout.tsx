import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/context";
import { InitializeToast, Loading, Toast } from "@/components";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Commerce",
  description: "Generated fashion with e-buying",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Suspense fallback={<Loading size="lg" />}>
          <ToastProvider>
            <InitializeToast />
            {children}
            <Toast />
          </ToastProvider>
        </Suspense>
      </body>
    </html>
  );
}
