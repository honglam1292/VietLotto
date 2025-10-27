/** @jsxImportSource @emotion/react */

import LeftPanel from "../LeftPanel";
import RightPanel from "../RightPanel";
import CenterPanel from "../CenterPanel";
import BottomTabBar, { TabKey } from "@/layout/desktop/LayoutCenter/BottomTabBar";
import { useState } from "react";
import NumberStats from "@/components/NumberStats";
import AccountPage from "../AccountPage";

const Homepage = () => {
  const [active, setActive] = useState<TabKey>("account");
  return (
    <div className="flex justify-center">
      <div className="w-screen hidden md:!block md:!w-[1400px]">
        <div className="h-full w-full text-black flex flex-col md:!flex-row gap-8 md:!gap-4 px-2 py-4 md:p-4">
          <div className="flex-1 justify-center items-center">
            <LeftPanel />
          </div>
          <div className="flex-2 justify-center items-center">
            <CenterPanel />
          </div>
          <div className="flex-1 justify-center items-center">
            <RightPanel />
          </div>
        </div>
      </div>
      <div className="flex md:!hidden overflow-auto w-screen">
        {active === "bet" && <CenterPanel />}
        {active === "result" && <RightPanel />}
        {active === "analysis" && <NumberStats />}
        {active === "account" && <AccountPage />}
        <BottomTabBar value={active} onChange={setActive} />
      </div>
    </div>
  );
};
export default Homepage;
