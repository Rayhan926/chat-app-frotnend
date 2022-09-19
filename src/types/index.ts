import { AxiosResponse } from 'axios';
import { ReactNode } from 'react';
import { UseMutationResult } from 'react-query';

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
  logout: () => void;
  mutateGoogleLogin?: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  >;
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
  type?: 'success' | 'error';
  message: string;
};
export type ToastAtomType = ToastType & {
  toastId: string;
};

export type ChatBoxProps = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  username: string;
  status: 'online' | 'offline';
};

type Attachments = {
  path: string;
  mimetype: string;
  _id: string;
};

export type Chat = {
  _id: string;
  senderId: string;
  receiverId?: string;
  message: string;
  status?: 'sending' | 'error' | 'sent' | 'delivered' | 'seen';
  createdAt?: Date;
  attachments?: Attachments[];
};

export type Conversation = ChatBoxProps & {
  lastMessage: Chat | null;
  unseenMessageCount: number;
};

export type SendMessageType = {
  message: string;
  sendTo: string;
};

export type TabButtonProps = {
  icon: ReactNode;
  activeIcon: ReactNode;
  path: string;
};

type Tab = {
  title: string;
  body: ReactNode;
};
export type RequestTabsProps = {
  tabs: Tab[];
};

export type HomepageLayoutProps = {
  children: ReactNode;
  contentWrapperClass?: string;
};

export type MessageInputType = {
  message: string;
};

export type FileWithAdditionalFields = File & {
  preview: string;
  width: 0;
  height: 0;
};
