/** @jsxImportSource @emotion/react */

import { LottoContext } from "@/context/LottoContext";
import Footer from "@/pages/Footer";
import Header from "@/pages/Header";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const ctx = useContext(LottoContext);
  const selectedCount = ctx?.numOfSelectBet || 0;
  const betValue = ctx?.betValue || [];
  const isDisplayMobileFooter = selectedCount > 0 && betValue.filter(x => x === undefined)?.length === 0;

  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
        {/* Header placeholder (reserve vertical space, add your Header later) */}
        <div className="h-14 sm:h-16 sticky top-0 z-40">
          <Header />
        </div>
        <main className="flex-1 flex flex-col">
          <div className={`flex-1 ${isDisplayMobileFooter ? 'pb-80 md:!pb-0' : ""}`}><Outlet /></div>
          {isDisplayMobileFooter && <div className="fixed bottom-0 md:!relative"><Footer /></div>}
        </main>
      </div>
    </React.Fragment>
  );
};
export default DefaultLayout;
