/* eslint-disable no-trailing-spaces */
import client from '@client';
import { googleLogin } from '@client/mutations';
import { TOKEN_KEY, USER_KEY } from '@config/constants';
import { getLocal, removeBoth, setLocal } from '@lib/localstorage';
import { AuthContenxtValue, AuthProviderProps, AuthUser, Login } from '@types';
import { cookies, getErrorMsg } from '@utils';
import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import useConversations from './useConversations';
import useToast from './useToast';

const AuthContext = createContext<AuthContenxtValue>({
  session: null,
  logout: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  // hooks
  const queryClient = useQueryClient();
  const { refetch } = useConversations();
  const router = useRouter();
  const { setToast } = useToast();

  // state
  const [localUser, setLocalUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Login
  const login = useCallback(
    ({ token, user }: Login) => {
      cookies.set(TOKEN_KEY, token, { path: '/' });
      setAccessToken(token);
      setLocalUser(user);
      setLocal(USER_KEY, user);
      router.push('/');
    },
    [router],
  );

  const mutateGoogleLogin = useMutation(
    (tokenId: string) => googleLogin(tokenId),
    {
      onSuccess: (data) => {
        login({ token: data.data.data.token, user: data.data.data.user });
      },
      onError: (err) => setToast({ message: getErrorMsg(err) }),
    },
  );

  // loading conversation on every page load

  useEffect(() => {
    if (!accessToken) return;
    refetch();
  }, [refetch, accessToken]);

  // Fetching user info if it's not in local storage but has the access token in cookie
  useEffect(() => {
    if (localUser) return;

    const timeout = setTimeout(() => {
      client.get('/auth/get-user').then(({ data: { data } }) => {
        setLocalUser(data);
        setLocal(USER_KEY, data);
      });
    }, 500);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser]);

  // Setting access token to state after page mounted
  useEffect(() => {
    setAccessToken(cookies.get(TOKEN_KEY));
    setLocalUser(getLocal(USER_KEY));
  }, []);

  // Logout
  const logout = useCallback(() => {
    cookies.remove(TOKEN_KEY, {
      path: '/',
    });
    setAccessToken(null);

    router.push('/login').then(() => {
      removeBoth(USER_KEY);
      queryClient.removeQueries();
    });
  }, [router, queryClient]);

  // Google Login
  // const googleLogin = useCallback(
  //   (tokenId: string) => {
  //     client
  //       .post('/auth/google-login', {
  //         tokenId: `Bearer ${tokenId}`,
  //       })
  //       .then(({ data: { data } }) => {
  //         login({
  //           token: data.token,
  //           user: data.user,
  //         });
  //       });
  //   },
  //   [login],
  // );

  // Context value with useMemo
  const contextValue = useMemo<AuthContenxtValue>(() => {
    return {
      session: {
        user: localUser,
        token: accessToken,
      },
      logout,
      mutateGoogleLogin,
    };
  }, [localUser, accessToken, logout, mutateGoogleLogin]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useSession = () => useContext(AuthContext);

export default useSession;
export { AuthProvider };
