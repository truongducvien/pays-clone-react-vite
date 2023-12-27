import { Resource } from 'i18next';
import enLang from './en';
import vnLang from './vn';

const languages = [
  {
    key: 'vn',
    icon: '',
    title: 'Vietnamese',
    resource: vnLang,
  },
  {
    key: 'en',
    icon: '',
    title: 'English',
    resource: enLang,
  },
];

const resources: Resource = {};

languages.forEach((item) => {
  resources[item.key] = {
    translation: item.resource,
  };
});

export default resources;
