import { conversationsAtom } from '@atoms';
import { getConversations } from '@client/queries';
import { Conversation } from '@types';
import { useAtom } from 'jotai';
import { useQuery } from 'react-query';

const useConversations = () => {
  const [conversations, setConversations] = useAtom(conversationsAtom);

  const query = useQuery('get-conversations', getConversations, {
    onSuccess: (data: Conversation[]) => {
      setConversations(data);
    },
    enabled: false,
    retry: 3,
  });

  const getUserInfo = (username: string) => {
    return {
      user: conversations.find(
        (conversation) => conversation.username === username,
      ),
      ...query,
    };
  };

  return {
    conversations,
    setConversations,
    getUserInfo,
    ...query,
  };
};

export default useConversations;
