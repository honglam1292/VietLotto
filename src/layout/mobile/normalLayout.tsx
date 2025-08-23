
import React from "react";
import { Outlet } from "react-router-dom";

const MNormalLayout = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};
export default MNormalLayout;
