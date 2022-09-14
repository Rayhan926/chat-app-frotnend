/* eslint-disable no-trailing-spaces */
import client from '@client';
import { getLocal, removeBoth, setLocal } from '@lib/localstorage';
import { AuthContenxtValue, AuthProviderProps, AuthUser, Login } from '@types';
import { cookies } from '@utils';
import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useQueryClient } from 'react-query';
import useConversations from './useConversations';

const AuthContext = createContext<AuthContenxtValue>({
  session: null,
  googleLogin: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  // hooks
  const queryClient = useQueryClient();
  const { refetch } = useConversations();
  const router = useRouter();

  // state
  const [localUser, setLocalUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // loading conversation on every page load

  useEffect(() => {
    if (!accessToken) return;
    refetch();
  }, [refetch, accessToken]);

  // Fetching user info if it's not in local storage but has the access token in cookie
  useEffect(() => {
    if (!localUser) {
      client.get('/auth/get-user').then(({ data: { data } }) => {
        setLocalUser(data);
        setLocal('user', data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Setting access token to state after page mounted
  useEffect(() => {
    setAccessToken(cookies.get('token'));
    setLocalUser(getLocal('user'));
  }, []);

  // Login
  const login = useCallback(
    ({ token, user }: Login) => {
      cookies.set('token', token, { path: '/' });
      setAccessToken(token);
      setLocalUser(user);
      router.push('/');
    },
    [router],
  );

  // Logout
  const logout = useCallback(() => {
    cookies.remove('token');
    setAccessToken(null);
    queryClient.invalidateQueries();
    router.push('/login').then(() => removeBoth('user'));
  }, [router, queryClient]);

  // Google Login
  const googleLogin = useCallback(
    (tokenId: string) => {
      client
        .post('/auth/google-login', {
          tokenId: `Bearer ${tokenId}`,
        })
        .then(({ data: { data } }) => {
          login({
            token: data.token,
            user: data.user,
          });
        });
    },
    [login],
  );

  // Context value with useMemo
  const contextValue = useMemo<AuthContenxtValue>(() => {
    return {
      session: {
        user: localUser,
        token: accessToken,
      },
      googleLogin,
      logout,
    };
  }, [localUser, accessToken, googleLogin, logout]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useSession = () => useContext(AuthContext);

export default useSession;
export { AuthProvider };
