import client from '@client';

export const sendFriendRequest = (sendTo: string) =>
  client.post('/user/send-friend-request', { sendTo });
