/** @jsxImportSource @emotion/react */

import { LottoContext } from "@/context/LottoContext";
import Footer from "@/pages/Footer";
import Header from "@/pages/Header";
import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import bgImage from "./bg-lotto.png";
import BottomTabBar, { TabKey } from "./LayoutCenter/BottomTabBar";

const DefaultLayout = () => {
  const ctx = useContext(LottoContext);
  const selectedCount = ctx?.numOfSelectBet || 0;
  const betValue = ctx?.betValue || [];
  const isDisplayMobileFooter = window.innerWidth > 768 || (selectedCount > 0 && betValue.filter(x => x === undefined)?.length === 0);
  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
        <div className="sticky top-0 z-40">
          <Header />
        </div>
        <main className="relative flex-1 flex flex-col bg-no-repeat bg-cover bg-center pb-8" style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="pointer-events-none absolute inset-0 z-0 bg-white/70" />
          <div className={`z-10 flex-1 ${isDisplayMobileFooter ? 'pb-80 md:!pb-0' : ""}`}><Outlet /></div>
          {/* {isDisplayMobileFooter && <div className="z-10 fixed bottom-0 md:!relative"><Footer /></div>} */}
        </main>
      </div>
    </React.Fragment>
  );
};
export default DefaultLayout;
