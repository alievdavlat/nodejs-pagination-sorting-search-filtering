import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import Middleware from 'i18next-express-middleware';
import path from 'path';

i18n
  .use(Backend)
  .use(Middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/translation.json')
    },
    detection: {
      order: ['querystring', 'cookie', 'header'],
      caches: ['cookie']
    }
  });

export default i18n;
