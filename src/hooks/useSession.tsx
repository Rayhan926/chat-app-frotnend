/* eslint-disable no-shadow */
/* eslint-disable no-trailing-spaces */
import client from '@client';
import { googleLogin } from '@client/mutations';
import { TOKEN_KEY, USER_KEY } from '@config/constants';
import { getLocal, removeBoth } from '@lib/localstorage';
import { AuthContenxtValue, AuthProviderProps, Login } from '@types';
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
import useFriendRequests from './useFriendRequests';
import useSentFriendRequests from './useSentFriendRequests';
import useSocket from './useSocket';
import useToast from './useToast';
import useToggle from './useToggle';
import useUser from './useUser';

const AuthContext = createContext<AuthContenxtValue>({
  session: null,
  logout: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  // hooks
  const queryClient = useQueryClient();
  const { refetch } = useConversations();
  const { refetch: refetchFriendRequests } = useFriendRequests();
  const { refetch: refetchSentFriendRequests } = useSentFriendRequests();
  const router = useRouter();
  const { setToast } = useToast();
  const { socket } = useSocket();
  const { toggleState } = useToggle();

  // state
  const { user, setUser } = useUser();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (user?._id && accessToken) {
      socket?.emit('join', {
        id: user?._id,
        token: `Bearer ${accessToken}`,
      });
    }
  }, [user, socket, accessToken]);

  // Login
  const login = useCallback(
    ({ token, user }: Login) => {
      cookies.set(TOKEN_KEY, token, { path: '/' });
      setAccessToken(token);
      setUser(user);
      router.push('/');
    },
    [router, setUser],
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
    refetchFriendRequests();
    refetchSentFriendRequests();
  }, [accessToken, refetch, refetchFriendRequests, refetchSentFriendRequests]);

  // Fetching user info if it's not in local storage but has the access token in cookie
  useEffect(() => {
    if (accessToken && !user) {
      client.get('/auth/get-user').then(({ data: { data } }) => {
        setUser(data);
      });
    }
  }, [user, accessToken, setUser]);

  // Setting access token to state after page mounted
  useEffect(() => {
    setAccessToken(cookies.get(TOKEN_KEY));
    setUser(getLocal(USER_KEY));
  }, [setUser]);

  // Logout
  const logout = useCallback(() => {
    cookies.remove(TOKEN_KEY, {
      path: '/',
    });
    setAccessToken(null);
    socket?.disconnect();
    toggleState();

    router.push('/login').then(() => {
      setUser(null);
      removeBoth(USER_KEY);
      queryClient.removeQueries();
    });
  }, [router, queryClient, socket, toggleState, setUser]);

  // Context value with useMemo
  const contextValue = useMemo<AuthContenxtValue>(() => {
    return {
      session: {
        user,
        token: accessToken,
      },
      logout,
      mutateGoogleLogin,
    };
  }, [user, accessToken, logout, mutateGoogleLogin]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useSession = () => useContext(AuthContext);

export default useSession;
export { AuthProvider };
