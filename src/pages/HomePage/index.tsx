/** @jsxImportSource @emotion/react */

import LeftPanel from "../LeftPanel";
import RightPanel from "../RightPanel";
import CenterPanel from "../CenterPanel";

const Homepage = () => {
  return (
    <div className="flex justify-center">
      <div className="w-screen md:!w-[1600px]">
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
    </div>
  );
};
export default Homepage;
