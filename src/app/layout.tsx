import type { Metadata } from "next";
import "./globals.css";
import { Header, MainLayout } from "@/components/templates";
import { ToastProvider } from "@/context";
import { InitializeToast, Loading, Toast } from "@/components";
import { Suspense } from "react";
import Footer from "@/components/templates/footer";

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
            <Header />
            <MainLayout>{children}</MainLayout>
            <Footer />
            <Toast />
          </ToastProvider>
        </Suspense>
      </body>
    </html>
  );
}
