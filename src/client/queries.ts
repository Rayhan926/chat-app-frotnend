import client from '@client';

export const getConversations = () => client.get('/conversations');
export const getChats = (id: string) =>
  client.get(`/conversations/chats/${id}`);

export const getFriendRequests = () => client.get('/user/friend-request');
