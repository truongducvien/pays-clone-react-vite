import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './auth/AuthContext';
import Router from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import CustomThemeProvider from './theme/ThemeContext';

const queryClient = new QueryClient();

function App() {
    return (
        <CustomThemeProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </AuthProvider>
            </QueryClientProvider>
        </CustomThemeProvider>
    );
}

export default App;
