import { ReactNode } from 'react';

export type MessageType = {
  isMe: boolean;
};

export type AuthProviderProps = {
  children?: ReactNode;
};

export type AuthUser = {
  email: string;
  name: string;
  _id: string;
  avatar?: string;
  username?: string;
};
export type AuthContenxtValue = {
  session: {
    token?: string | null;
    user?: AuthUser | null;
  } | null;
  // eslint-disable-next-line no-unused-vars
  googleLogin: (tokenId: string) => void;
  logout: () => void;
};

export type Login = {
  token: string;
  user: AuthUser;
};

export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export type ToastType = {
  type: 'success' | 'error';
  message: string;
};
export type ToastAtomType = ToastType & {
  toastId: string;
};
