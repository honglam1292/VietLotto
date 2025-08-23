import { RouteObject } from "react-router-dom";
import { desktopRoutes } from "./desktopRoutes";
export const isMobile = /iPhone|iPad|iPod|Android|tablet/i.test(
  navigator.userAgent
);
const routesConfig: RouteObject[] = desktopRoutes;
export default routesConfig;
