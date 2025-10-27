import { useContext, useState } from "react";
import logo from "./logo.png";
import { getLotteryToday } from "./mock";
import BallIcon from "@/components/BallIcon";
import { LottoContext } from "@/context/LottoContext";
import ModalLogin from "./ModalLogin";
import { useTranslation } from "react-i18next";
import HeaderCountdown from "@/components/HeaderCoutdown";
import { Button, Menu, MenuItem } from "@mui/material";

const labels = ["Miền Bắc", "Miền Trung", "Miền Nam"] as const;

const Header = () => {
  const [selected, setSelected] = useState<number>(0);
  const [hoverTab, setHoverTab] = useState<number | null>(null);

  // Modal login
  const [loginOpen, setLoginOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const bgClass = "bg-[#c69102]";
  // const bgHover =
  //   "cursor-pointer hover:bg-gradient-to-r hover:from-[#6a0f0f] hover:to-[#a32020] transition";
  const bgHover = 'cursor-pointer hover:bg-[#c69102] transition'

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

  // Lang menu
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);
  const openLang = Boolean(anchorElLang);
  const handleClickLang = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorElLang(e.currentTarget);
  const handleCloseLang = () => setAnchorElLang(null);
  const setLang = (lng: "vi" | "en") => {
    i18n.changeLanguage(lng);
    handleCloseLang();
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div
      className="relative h-14"
      onMouseLeave={() => setHoverTab(null)}
    >
      <header className="bg-[#FFBD00] text-white flex justify-between items-center px-4 sm:px-6 lg:px-8 h-full">
        {/* Logo */}
        <img src={logo} alt="VietLotto Logo" className="h-full w-auto" />

        {/* Tabs */}
        <div
          className="hidden md:!flex justify-between text-center w-96 h-10 gap-2"
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
                className={`rounded-lg flex justify-center items-center text-xs md:text-base p-2 md:p-4 flex-1 focus:outline-none ${isSelected ? bgClass : bgHover
                  }`}
                onMouseEnter={() => setHoverTab(index)}
                onClick={() => applySelect(index)}
              >
                {t(label)}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        {/* <div className="flex items-center gap-2">
          <button
            id="lang-button"
            aria-controls={openLang ? "lang-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openLang ? "true" : undefined}
            onClick={handleClickLang}
            className="px-2 py-1 rounded-md bg-white text-[#FFBD00] font-bold text-sm hover:opacity-90 focus:outline-none"
          >
            {i18n.language === "vi" ? "VI" : "EN"}
          </button>

          <Menu
            id="lang-menu"
            anchorEl={anchorElLang}
            open={openLang}
            onClose={handleCloseLang}
            slotProps={{ list: { "aria-labelledby": "lang-button" } }}
          >
            <MenuItem onClick={() => setLang("vi")}>
              <ListItemIcon style={{ minWidth: 28 }}>🇻🇳</ListItemIcon>
              <ListItemText>Tiếng Việt</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => setLang("en")}>
              <ListItemIcon style={{ minWidth: 28 }}>🇺🇸</ListItemIcon>
              <ListItemText>English</ListItemText>
            </MenuItem>
          </Menu>

          <button
            className="cursor-pointer px-3 py-1 rounded-md bg-white text-[#FFBD00] font-semibold hover:opacity-90 focus:outline-none text-sm"
            onClick={handleLoginClick}
          >
            {t("Đăng nhập")}
          </button>
        </div> */}
        <div className="hidden md:!flex"><HeaderCountdown /></div>
        <div className="flex md:!hidden -mr-4">
          <div className="mt-1.5"><HeaderCountdown /></div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29 14H11M29 20H17M29 26H15" stroke="#020617" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            disableScrollLock
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {labels.map((label, index) => {
              const isSelected = selected === index;
              return (
                <MenuItem className={isSelected ? bgClass : bgHover} onClick={() => {
                  handleClose();
                  applySelect(index)
                }}>
                  {t(label)}
                </MenuItem>
                // <button
                //   key={label}
                //   type="button"
                //   role="tab"
                //   aria-selected={isSelected}
                //   className={`rounded-lg flex justify-center items-center text-xs md:text-base p-2 md:p-4 flex-1 focus:outline-none ${isSelected ? bgClass : bgHover
                //     }`}
                //   onMouseEnter={() => setHoverTab(index)}
                //   onClick={() => applySelect(index)}
                // >

                // </button>
              );
            })}
          </Menu>
        </div>
      </header>

      {hoverTab !== null && value[hoverTab] && (
        <div className="h-32 md:h-72 w-full bg-[#373737]">
          <div className="flex justify-center items-center gap-0 md:gap-8 h-full">
            {value[hoverTab].name.map((item: string, idx: number) => (
              <div
                key={`${item}-${idx}`}
                className="flex flex-col items-center"
              >
                <BallIcon
                  text={item}
                  color={idx}
                  channel={value[hoverTab]?.text?.[idx]}
                  onSelectCountry={onSelectCountryFromBall}
                />
                <div className="text-white text-sm md:text-2xl">
                  {t(value[hoverTab]?.text?.[idx] ?? "")}
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
