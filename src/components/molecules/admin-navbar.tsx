import React from "react";
import { Hamburger } from "../atoms";
import Link from "next/link";

interface AdminNavbarProps {
  onLogout: () => void;
}

function AdminNavbar({ onLogout }: AdminNavbarProps) {
  return (
    <header className="navbar sticky top-0 z-20 bg-white">
      <Hamburger />
      <nav className="flex-1">
        <Link href={"/admin/dashboard"} className="btn btn-ghost text-xl">
          Commerce
        </Link>
      </nav>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminNavbar;
