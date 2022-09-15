import client from '@client';
import { SendMessageType } from '@types';

export const googleLogin = (tokenId: string) =>
  client.post('/auth/google-login', {
    tokenId: `Bearer ${tokenId}`,
  });

export const sendFriendRequest = (sendTo: string) =>
  client.post('/user/friend-request', { sendTo });

export const sendMessage = (sendMessageOptions: SendMessageType) =>
  client.post('/conversations/chat/send', sendMessageOptions);

export const accpetFriendRequest = (id: string) =>
  client.post('/user/friend-request/accept', { id });

export const cancelFriendRequest = (id: string, type?: 'reject' | 'cancel') =>
  client.post('/user/friend-request/cancel', { id, type: type || 'reject' });
