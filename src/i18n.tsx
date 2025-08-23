import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import tlJson from "@/translation/tl.json";
import enJson from "@/translation/en.json";
import viJson from "@/translation/vi.json";

export const resources = {
  en: { translation: enJson },
  vi: { translation: viJson },
  tl: { translation: tlJson },
} as const;

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en", //
  debug: false,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
