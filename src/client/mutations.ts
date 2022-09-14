import client from '@client';
import { SendMessageType } from '@types';

export const sendFriendRequest = (sendTo: string) =>
  client.post('/user/send-friend-request', { sendTo });

export const sendMessage = (sendMessageOptions: SendMessageType) =>
  client.post('/conversations/send', sendMessageOptions);
