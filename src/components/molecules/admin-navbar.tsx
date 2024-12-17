import React from "react";
import { Hamburger } from "../atoms";
import Link from "next/link";

interface AdminNavbarProps {
  onLogout: () => void;
}

function AdminNavbar({ onLogout }: AdminNavbarProps) {
  return (
    <div className="navbar sticky top-0 z-20 bg-white">
      <Hamburger />
      <div className="flex-1">
        <Link href={"/admin/dashboard"} className="btn btn-ghost text-xl">
          Commerce
        </Link>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;
