import React from "react";

interface DrawerProps extends React.PropsWithChildren {
  id: string;
  toggle: React.ReactNode;
  position?: "left" | "right";
}

function Drawer({ id, toggle, position, children }: DrawerProps) {
  return (
    <div className={`${position && position === "right" ? "drawer-end" : ""}`}>
      <input id={id} type="checkbox" className="drawer-toggle" />
      <div>{toggle}</div>

      <div className="drawer-side z-30">
        <label
          htmlFor={id}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-white min-h-full w-80 p-4">{children}</div>
      </div>
    </div>
  );
}

export default Drawer;
