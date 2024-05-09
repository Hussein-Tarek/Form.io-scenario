import { initReactI18next } from "react-i18next";

import i18n from "i18next";
import languageDetector from "i18next-browser-languagedetector";

import arTranslation from "./locale/ar.json";
import enTranslation from "./locale/en.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  ar: {
    translation: arTranslation,
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
