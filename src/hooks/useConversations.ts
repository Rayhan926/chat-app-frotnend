import { conversationsAtom } from '@atoms';
import { getConversations } from '@client/queries';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { useQuery } from 'react-query';

const useConversations = () => {
  const [conversations, setConversations] = useAtom(conversationsAtom);

  const query = useQuery('get-conversations', getConversations, {
    enabled: false,
    retry: 2,
    onSuccess: (data) => {
      setConversations(data);
    },
  });

  const getUserInfo = (usernameOrId: string) => {
    return conversations.find(
      (conversation) =>
        conversation.username === usernameOrId ||
        conversation._id === usernameOrId,
    );
  };

  const updateConversation = useCallback(
    (conversationId: string, updatedConversation: any) => {
      setConversations((prevConversations) =>
        prevConversations.map((conversaion) => {
          if (conversaion._id === conversationId) {
            return {
              ...conversaion,
              ...updatedConversation,
            };
          }

          return conversaion;
        }),
      );
    },
    [setConversations],
  );

  return {
    getUserInfo,
    updateConversation,
    ...query,
    conversations,
  };
};

export default useConversations;
