import { ReactNode } from 'react';

export type MessageType = {
  isMe: boolean;
};

export type AuthProviderProps = {
  children?: ReactNode;
};

type AuthUser = {
  email: string;
  name: string;
  _id: string;
  avatar?: string;
  username?: string;
};
export type AuthContentValue = {
  session: {
    token?: string;
    user?: AuthUser;
  } | null;
  // eslint-disable-next-line no-unused-vars
  googleLogin: (tokenId: string) => void;
};

export type Login = {
  token: string;
  user: AuthUser;
};
