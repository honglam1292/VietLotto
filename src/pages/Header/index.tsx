import { useContext, useState } from "react";
import logo from "./logo.png";
import { getLotteryToday } from "./mock";
import BallIcon from "@/components/BallIcon";
import { LottoContext } from "@/context/LottoContext";
import ModalLogin from "./ModalLogin";

const labels = ["Miền Bắc", "Miền Trung", "Miền Nam"] as const;

const Header = () => {
  const [selected, setSelected] = useState<number>(0);
  const [hoverTab, setHoverTab] = useState<number | null>(null);

  // Modal login
  const [loginOpen, setLoginOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const bgClass = "bg-gradient-to-r from-[#6a0f0f] to-[#a32020]";
  const bgHover =
    "cursor-pointer hover:bg-gradient-to-r hover:from-[#6a0f0f] hover:to-[#a32020] transition";

  const value = getLotteryToday();
  const ctx = useContext(LottoContext);

  const applySelect = (index: number) => {
    ctx?.setSelectCountry(labels[index]);
    setSelected(index);
    setHoverTab(null);
  };

  const onSelectCountryFromBall = () => {
    if (hoverTab !== null) applySelect(hoverTab);
  };

  const handleLoginClick = () => setLoginOpen(true);

  const doLogin = async ({
    username,
    password,
    remember,
  }: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    console.log("Login submit", { username, password, remember });
    setAuthLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setLoginOpen(false);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div
      className="relative h-14"
      onMouseLeave={() => setHoverTab(null)} // chỉ unset khi rời toàn bộ container
    >
      <header className="bg-[#FFBD00] text-white flex justify-between items-center px-4 sm:px-6 lg:px-8 h-full">
        {/* Logo */}
        <img src={logo} alt="VietLotto Logo" className="h-full w-auto" />

        {/* Tabs */}
        <div
          className="flex justify-between text-center w-96 h-full"
          role="tablist"
          aria-label="Vùng miền xổ số"
        >
          {labels.map((label, index) => {
            const isSelected = selected === index;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`flex justify-center items-center text-xs md:text-base p-2 md:p-4 flex-1 focus:outline-none ${isSelected ? bgClass : bgHover
                  }`}
                onMouseEnter={() => setHoverTab(index)}
                onClick={() => applySelect(index)}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center">
          <button
            className="cursor-pointer px-3 py-1 rounded-md bg-white text-[#FFBD00] font-semibold hover:opacity-90 focus:outline-none text-sm"
            onClick={handleLoginClick}
          >
            Đăng nhập
          </button>
        </div>
      </header>

      {hoverTab !== null && value[hoverTab] && (
        <div className="h-32 md:h-72 w-full bg-[#373737]">
          <div className="flex justify-center items-center gap-0 md:gap-8 h-full">
            {value[hoverTab].name.map((item: string, idx: number) => (
              <div key={`${item}-${idx}`} className="flex flex-col items-center">
                <BallIcon
                  text={item}
                  color={idx}
                  channel={value[hoverTab]?.text?.[idx]}
                  onSelectCountry={onSelectCountryFromBall}
                />
                <div className="text-white text-sm md:text-2xl">
                  {value[hoverTab]?.text?.[idx] ?? ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ModalLogin
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSubmit={doLogin}
        loading={authLoading}
      />
    </div>
  );
};

export default Header;
