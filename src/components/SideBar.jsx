import React from "react";
import { Outlet } from "react-router-dom";
export const SideBar = ({ children }) => {
  return (
    <div className="sidebar">
      <h1>SideBar</h1>
      <div className="sidebar_child">{children}</div>
      <Outlet />
    </div>
  );
};
