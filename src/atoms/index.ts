import { USER_KEY } from '@config/constants';
import {
  Chat,
  ChatBoxProps,
  Conversation,
  FileWithAdditionalFields,
  MessageInputType,
  Theme,
  ToastAtomType,
  Typing,
  UploadOnProgress,
} from '@types';
import { atomWithLocalStorage } from '@utils';
import { atom, useAtom } from 'jotai';
import { Socket } from 'socket.io-client';

const sendFriendRequesDrawerAtom = atom(false);
export const useOpenFriendRequestDrawer = () =>
  useAtom(sendFriendRequesDrawerAtom);

export const userAtom = atomWithLocalStorage(USER_KEY);

export const toastAtom = atom<ToastAtomType[]>([]);
export const conversationsAtom = atom<Conversation[]>([]);
export const chatsAtom = atom<Chat[]>([]);
export const activeConversationAtom = atom<string | null>(null);
export const friendRequestsAtom = atom<ChatBoxProps[]>([]);
export const friendRequestsSentAtom = atom<ChatBoxProps[]>([]);
export const messageInputAtom = atom<MessageInputType>({
  message: '',
});

export const filesAtom = atom<FileWithAdditionalFields[]>([]);
export const uploadOnProgeressAtom = atom<UploadOnProgress[]>([]);
export const socketAtom = atom<Socket | null>(null);
export const typingAtom = atom<Typing[]>([]);

export const themeAtom = atom<Theme>(null);
