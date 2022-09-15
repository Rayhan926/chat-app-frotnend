import client from '@client';
import { Conversation } from '@types';

export const getConversations = () =>
  client.get<any, Conversation[]>('/conversations');
export const getChats = (id: string) =>
  client.get(`/conversations/chats/${id}`);

export const getFriendRequests = () =>
  client.get<any, Conversation[]>('/user/friend-request');

export const getSentFriendRequests = () =>
  client.get<any, Conversation[]>('/user/friend-request/sent');
