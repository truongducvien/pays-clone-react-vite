import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './auth/AuthContext';
import Router from './routes';
import CustomThemeProvider from './theme/ThemeContext';
import { LazyMotion, domMax } from 'framer-motion';
import './locales';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <CustomThemeProvider>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LazyMotion strict features={domMax}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </LazyMotion>
        </AuthProvider>
      </QueryClientProvider>
    </CustomThemeProvider>
  );
}

export default App;
