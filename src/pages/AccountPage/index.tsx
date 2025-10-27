import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import ModalLogin from "../Header/ModalLogin";


const AccountPage = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const { t, i18n } = useTranslation();


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

  return (
    <div
      className="relative flex justify-center items-center w-full h-[80vh]"
    >
      <div className="flex flex-col items-center gap-2">
        <button
          id="lang-button"
          aria-controls={openLang ? "lang-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openLang ? "true" : undefined}
          onClick={handleClickLang}
          className="px-2 py-1 rounded-md bg-white text-[#FFBD00] font-bold text-xl hover:opacity-90 focus:outline-none"
        >
          {i18n.language === "vi" ? "VI" : "EN"}
        </button>

        <Menu
          id="lang-menu"
          anchorEl={anchorElLang}
          open={openLang}
          onClose={handleCloseLang}
          slotProps={{ list: { "aria-labelledby": "lang-button" } }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
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
          className="cursor-pointer px-3 py-1 rounded-md bg-white text-[#FFBD00] font-semibold hover:opacity-90 focus:outline-none text-xl"
          onClick={handleLoginClick}
        >
          {t("Đăng nhập")}
        </button>
      </div>
      <ModalLogin
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSubmit={doLogin}
        loading={authLoading}
      />
    </div>
  );
};

export default AccountPage;
