import { AdminNavbar } from "@/components/molecules";
import React from "react";

interface AdminLayoutProps extends React.PropsWithChildren {
  onLogout: () => void;
}

function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  return (
    <>
      <AdminNavbar onLogout={onLogout} />
      <div className="p-2 flex flex-row min-h-screen">{children}</div>
    </>
  );
}

export default AdminLayout;
