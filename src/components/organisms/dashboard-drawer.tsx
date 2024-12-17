import { INav } from "@/utils";
import Link from "next/link";
import React from "react";

interface DashboardDrawerProps extends React.PropsWithChildren {
  toggle: React.ReactNode;
  items: INav[];
}

function DashboardDrawer({ children, toggle, items }: DashboardDrawerProps) {
  return (
    <div className="drawer">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{toggle}</div>
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {children}
        {items?.length > 0 && (
          <ul className="menu bg-white text-base-content min-h-full w-80 p-4">
            {items.map((obj, idx) => (
              <li key={idx}>
                <Link href={obj.link}>{obj.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardDrawer;
