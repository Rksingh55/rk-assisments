import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next'
import { resources } from './resources'

// languages => Eng || Chinese || Spanish || Arabic || Indonesian || Portuguese || French || Japnese || Russian || German 

//console.log("language detector : ", LanguageDetector)

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next).init({
        fallbackLng: "EN",
        debug: true,
        detection: {
            order: ["queryString", "cookie"],
            cache: ["cookie"]
        },
        interpolation: {
            escapeValue: false
        },
        // lng: "FR",
        resources
    })

export default i18n;


