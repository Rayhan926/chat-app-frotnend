import {
  Chat,
  ChatBoxProps,
  Conversation,
  FileWithAdditionalFields,
  MessageInputType,
  ToastAtomType,
  UploadOnProgress,
} from '@types';
import { atom, useAtom } from 'jotai';
import { Socket } from 'socket.io-client';

const sendFriendRequesDrawerAtom = atom(false);
export const useOpenFriendRequestDrawer = () =>
  useAtom(sendFriendRequesDrawerAtom);

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
