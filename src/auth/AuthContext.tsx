import { ReactNode, createContext, useEffect, useState } from 'react';
import { AuthContextType } from './types';
import { LogInPayload, useLogIn } from '@/api/auth';
import { getSessionStorage, setSessionStorage } from '@/utils';

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const { mutate } = useLogIn();

    const initialize = () => {
        const accessToken = getSessionStorage('accessToken');
        setIsAuthenticated(!!accessToken);
    };

    const logIn = (payload: LogInPayload) => {
        mutate(payload, {
            onSuccess: (data) => {
                setSessionStorage('accessToken', data.accessToken);
                setIsAuthenticated(true);
            },
            onError(error, variables) {
                console.log('error: ', error, variables);
            },
        });
    };

    const logOut = () => {};

    useEffect(() => {
        initialize();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}
