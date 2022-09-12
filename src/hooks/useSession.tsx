/* eslint-disable no-trailing-spaces */
import client from '@client';
import { AuthContentValue, AuthProviderProps, Login } from '@types';

import {
  createContext, useCallback, useContext, useMemo, useState
} from 'react';
import { useLocalStorage } from 'react-use';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AuthContext = createContext<AuthContentValue>({
  session: null,
  googleLogin: () => {} 
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [value, setValue] = useLocalStorage('user');
  
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // console.log({ value, accessToken });

  const login = useCallback(({ token, user }:Login) => { 
    cookies.set('token', token, { path: '/' });
    setAccessToken(token);
    setValue(user);
  }, [setValue]);

  const googleLogin = useCallback((tokenId:string) => {
    client.post('/google-login', {
      tokenId: `Bearer ${tokenId}`
    }).then(({ data: { data } }) => {
      login({
        token: data.token,
        user: data.user
      });
    });
  }, [login]);

  const contextValue = useMemo(() => {
    return {
      session: null,
      googleLogin,
    };
  }, []);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const useSession = () => useContext(AuthContext);

export default useSession;
export { AuthProvider };
