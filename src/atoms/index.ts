import { Chat, ChatBoxProps, Conversation, ToastAtomType } from '@types';
import { atom, useAtom } from 'jotai';

const sendFriendRequesDrawerAtom = atom(false);
export const useOpenFriendRequestDrawer = () =>
  useAtom(sendFriendRequesDrawerAtom);

export const toastAtom = atom<ToastAtomType[]>([]);
export const conversationsAtom = atom<Conversation[]>([]);
export const chatsAtom = atom<Chat[]>([]);
export const friendRequestsAtom = atom<ChatBoxProps[]>([]);
