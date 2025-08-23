/** @jsxImportSource @emotion/react */

import Footer from "@/pages/Footer";
import Header from "@/pages/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
        {/* Header placeholder (reserve vertical space, add your Header later) */}
        <div className="h-14 sm:h-16 sticky top-0 z-40">
          <Header />
        </div>
        <main className="flex-1 flex flex-col">
          <div className="flex-1"><Outlet /></div>
          <div><Footer /></div>
        </main>
      </div>
    </React.Fragment>
  );
};
export default DefaultLayout;
