import { getConversations } from '@client/queries';
import { useQuery } from 'react-query';

const useConversations = () => {
  const query = useQuery('get-conversations', getConversations, {
    enabled: false,
    retry: 3,
  });

  const getUserInfo = (username: string) => {
    return {
      user:
        query?.data &&
        query.data.find((conversation) => conversation.username === username),
      ...query,
    };
  };

  return {
    getUserInfo,
    ...query,
  };
};

export default useConversations;
