import { PATH } from "@/constants/path";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import DefaultLayout from "@/layout/desktop";

const HomePage = lazy(() => import("@/pages/HomePage"));

export const desktopRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        path: PATH.home,
        element: <HomePage />,
      },
      {
        path: PATH.lotto,
        element: <HomePage />,
      },
    ],
  },
];
