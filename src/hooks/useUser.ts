/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { userAtom } from '@atoms';
import { AuthUser } from '@types';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

const useUser = () => {
  const [user, setUser] = useAtom(userAtom);

  const updateUser = useCallback(
    (updatedInfo: Partial<AuthUser> | ((user: AuthUser) => AuthUser)) => {
      setTimeout(() => {
        setUser((prevUser: AuthUser): AuthUser => {
          if (!prevUser) return prevUser;
          return {
            ...prevUser,
            ...(typeof updatedInfo === 'function'
              ? updatedInfo(prevUser)
              : updatedInfo),
          };
        });
      }, 100);
    },
    [setUser],
  );

  return { user, setUser, updateUser };
};

export default useUser;
