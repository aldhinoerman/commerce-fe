/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AdminLayout } from "@/components";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

function DashboardLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const onLogout = async () => {
    try {
      const response = await axios.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        router.push("/admin");
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  return <AdminLayout onLogout={onLogout}>{children}</AdminLayout>;
}

export default DashboardLayout;
