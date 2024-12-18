import React from "react";
import { DashboardDrawer } from "../organisms";
import { navData } from "@/utils";

function Hamburger() {
  return (
    <div className="flex-none">
      <DashboardDrawer
        toggle={
          <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        }
        items={navData}
      ></DashboardDrawer>
    </div>
  );
}

export default Hamburger;
