import React, { useContext } from "react";
import ball1 from "./ball1.png";
import ball2 from "./ball2.png";
import ball3 from "./ball3.png";
import ball4 from "./ball4.png";
import { LottoContext } from "@/context/LottoContext";

type BallIconProps = {
  text: string; // ví dụ 'MB'
  color?: number; // ví dụ 0
  channel?: string; // ví dụ 'Miền Bắc'
  onSelectCountry: () => void;
};

// const getRandomColor = () => {
//   const colors = ["#4caf50", "#2196f3", "#f44336", "#ff9800", "#9c27b0"];
//   return colors[Math.floor(Math.random() * colors.length)];
// };

export default function BallIcon({ text, color, channel,onSelectCountry }: BallIconProps) {
  const ctx = useContext(LottoContext);

  const getBallImage = () => {
    switch (color) {
      case 0:
        return ball1;
      case 1:
        return ball2;
      case 2:
        return ball3;
      case 3:
        return ball4;
      default:
        return ball1;
    }
  }
  const handleSelect = () => {
    onSelectCountry();
    ctx?.setChannel(channel!);
  }
  return (
    <div
      onClick={handleSelect}
      className="cursor-pointer size-24 md:size-56 relative rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-md"
    >
      <img src={getBallImage()} alt="VietLotto Logo" className="h-full w-auto" />
      <div className="text-3xl md:text-7xl absolute">{text}</div>
    </div>
  );
}
