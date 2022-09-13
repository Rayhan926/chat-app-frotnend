import client from '@client';

export const getConversations = () => client.get('/conversations');
