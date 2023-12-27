import i18n from '@/locales';
import Helmet from 'react-helmet';
import LogInForm from './LogInForm';

export default function LogInPage() {
  return (
    <>
      <Helmet>
        <title>{i18n.t('title.signIn')}</title>
      </Helmet>

      <LogInForm />
    </>
  );
}
