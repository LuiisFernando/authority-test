import {
    createContext,
    ReactNode,
    useState,
    useContext,
    useEffect
} from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { toast } from 'react-toastify';

import api from 'service/api';

type signInCredentials = {
    user: string;
    password: string;
}

type AuthContextData = {
    signIn(credentials: signInCredentials): Promise<void>,
    logout(): Promise<void>,
    loadUserInfo(): Promise<void>,
    userInfo?: UserInfo,
}

type AuthProviderProps = {
    children: ReactNode
}

type SignInResponse = {
    name: string,
    access_token: string,
}

type UserInfo = {
    id: Number;
    name: string;
    username: string;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>();

    async function loadUserInfo() {
        try {
            const { ['authority.token']: token } = parseCookies();

            if (token) {
                const response = await api.get('/api/controllers/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (response)
                    setUserInfo(response.data.user);
            } else {
                Router.push('/');
            }

        } catch (e: any) {
            toast.error(e.response?.data?.message);
        }
    }

    useEffect(() => {
        loadUserInfo();
    }, []);

    async function signIn({ user, password }: signInCredentials) {
        try {
            const response = await api.post<SignInResponse>('api/controllers/auth', { user, password });

            await destroyCookie({}, 'authority.token', {
                path: '/'
            });

            if (response && response.data) {
                const { access_token } = response.data;
                setCookie(undefined, 'authority.token', access_token, {
                    maxAge: 60 * 20, // 20 min same as .env expiresin prop
                    path: '/'
                });

                loadUserInfo();
                Router.push('/dashboard');
            }
        } catch (e: any) {
            throw e;
        }
    }

    async function logout() {
        setUserInfo(undefined);
        destroyCookie({}, 'authority.token', {
            path: '/'
        });
        Router.push('/');
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                logout,
                loadUserInfo,
                userInfo
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider as default, useAuth };;