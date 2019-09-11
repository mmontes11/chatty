import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";

export const setupLocalization = () => {
  addLocaleData([...en]);
};

export const getLocale = () => "en";

export const getMessages = () => require(`./translations/${getLocale()}-translations.json`);
