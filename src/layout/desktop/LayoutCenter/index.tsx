import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutCenterStyle, MainContent } from "./style";

const LayoutCenter = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/center") {
      navigate("/center/profile");
    }
  }, [pathname, navigate]);

  return (
    <LayoutCenterStyle>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutCenterStyle>
  );
};

export default LayoutCenter;
