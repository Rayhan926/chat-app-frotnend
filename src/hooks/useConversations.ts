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

  const getUserInfo = useCallback(
    (usernameOrId: string) => {
      return conversations.find(
        (conversation) =>
          conversation.username === usernameOrId ||
          conversation._id === usernameOrId,
      );
    },
    [conversations],
  );

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

  const updateTypingStatus = useCallback(
    (conversationId: string, typingStatus: boolean) => {
      updateConversation(conversationId, {
        isTyping: typingStatus,
      });
    },
    [updateConversation],
  );

  return {
    getUserInfo,
    updateConversation,
    updateTypingStatus,
    ...query,
    conversations,
  };
};

export default useConversations;
