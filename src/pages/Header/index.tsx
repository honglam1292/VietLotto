import { useContext, useState } from "react";
import logo from "./logo.png";
import { getLotteryToday } from "./mock";
import BallIcon from "@/components/BallIcon";
import { LottoContext } from "@/context/LottoContext";

const Header = () => {
  const [selected, setSelected] = useState(0);
  const [hoverTab, setHoverTab] = useState<number | undefined>();
  const labels = ["Miền Bắc", "Miền Trung", "Miền Nam"];
  const bgClass = 'bg-gradient-to-r from-[#6a0f0f] to-[#a32020]';
  const bgHover = 'cursor-pointer hover:bg-gradient-to-r hover:from-[#6a0f0f] hover:to-[#a32020] transition';
  const value = getLotteryToday();
  const ctx = useContext(LottoContext);

  const onSelectCountry = () => {
    ctx?.setSelectCountry(labels[hoverTab!]);
    setSelected(hoverTab!);
    setHoverTab(undefined);
  };

  return (
    <div
      className="relative h-14"
      onMouseLeave={() => setHoverTab(undefined)} // Chỉ unset khi rời toàn bộ container
    >
      <header className="bg-[#FFBD00] text-white flex justify-between items-center px-4 sm:px-6 lg:px-8 h-full">
        <img src={logo} alt="VietLotto Logo" className="h-full w-auto" />
        <div className="flex justify-between text-center w-96 h-full">
          {labels.map((label, index) => (
            <div
              key={index}
              className={`flex justify-center items-center text-xs md:text-base p-2 md:p-4 flex-1 ${bgHover} ${selected === index ? bgClass : ""}`}
              onMouseEnter={() => setHoverTab(index)}
              onClick={() => setSelected(index)}
            >
              {label}
            </div>
          ))}
        </div>
        <div></div>
      </header>

      {hoverTab !== undefined && (
        <div className="h-32 md:h-72 w-full bg-[#373737]">
          <div className="flex justify-center items-center gap-0 md:gap-8 h-full">
            {value[hoverTab].name.map((item, index) => (
              <div>
                <div key={index}>
                  <BallIcon text={item} color={index} channel={value[hoverTab]?.text![index]} onSelectCountry={onSelectCountry} />
                </div>
                <div className="text-white text-sm md:text-2xl">{value[hoverTab]?.text![index]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
