import {
  Chat,
  ChatBoxProps,
  Conversation,
  MessageInputType,
  ToastAtomType,
} from '@types';
import { atom, useAtom } from 'jotai';

const sendFriendRequesDrawerAtom = atom(false);
export const useOpenFriendRequestDrawer = () =>
  useAtom(sendFriendRequesDrawerAtom);

export const toastAtom = atom<ToastAtomType[]>([]);
export const conversationsAtom = atom<Conversation[]>([]);
export const chatsAtom = atom<Chat[]>([]);
export const friendRequestsAtom = atom<ChatBoxProps[]>([]);
export const friendRequestsSentAtom = atom<ChatBoxProps[]>([]);
export const messageInputAtom = atom<MessageInputType>({
  message: '',
});
