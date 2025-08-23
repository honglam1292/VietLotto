import { LOCAL, sysLang } from "@/constants";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useIP = () => {
  const { i18n } = useTranslation();
  const locale = localStorage.getItem(LOCAL.i18nLng);

  const handleLanguage = useCallback(async () => {
    const valueSyslang = String(sysLang[locale || "en"]);

    localStorage.setItem(LOCAL.SYSLANG, valueSyslang);

    if (locale) {
      i18n?.changeLanguage(locale || "en");
      localStorage.setItem(LOCAL.i18nLng, locale);
      return;
    }

    // const { data } = await axios.get("https://geolocation-db.com/json/");

    // const language = LangsKey[data.country_code as string];

    // if (!language) {
    //   dispatch(setClientCountryCode("vi"));
    //   i18n.changeLanguage("vi");
    //   return;
    // }
    // dispatch(setClientCountryCode(language));
    // i18n.changeLanguage(language);

    localStorage.setItem(LOCAL.i18nLng, "en");
    i18n?.changeLanguage("en");
  }, [i18n, locale]);

  // const sysLangCurrent = sysLang.[dataCountryCode];

  // const sysLangCurrent = sysLang[locale];

  // localStorage.setItem("syslang", sysLangCurrent + "");

  useEffect(() => {
    handleLanguage();
  }, [handleLanguage]);
};
