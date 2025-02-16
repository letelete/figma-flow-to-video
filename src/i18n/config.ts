import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import nsSelectFlowView from './en/select-flow-view.json';

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      'select-flow-view': nsSelectFlowView,
    },
  },
});
