import i18n from 'i18next';
import enUsTrans from './en.json';
import zhCnTrans from './zh.json';
import jaUs from './ja.json';
import koUs from './ko.json';
import { initReactI18next } from 'react-i18next';
export const zh = 'zh';
export const en = 'en';
export const ko = 'ko';
export const ja = 'ja';
i18n.use(initReactI18next) //init i18next
    .init({
        //
        resources: {
            zh: {
                translation: zhCnTrans,
            },
            en: {
                translation: enUsTrans,
            },
            ko: {
                translation: koUs,
            },
            ja: {
                translation: jaUs,
            },
        },
        //，key，en/zh
        // fallbackLng: "en",
        fallbackLng: window.localStorage.getItem('i18n') || 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
