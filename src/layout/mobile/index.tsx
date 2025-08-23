import React from "react";
import { Outlet } from "react-router-dom";
const MDefaultLayout = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};
export default MDefaultLayout;
