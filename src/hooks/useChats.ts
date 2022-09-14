import { chatsAtom } from '@atoms';
import { getChats } from '@client/queries';
import { Chat } from '@types';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import useConversations from './useConversations';

const useChats = () => {
  const router = useRouter();
  const [chats, setChats] = useAtom(chatsAtom);
  const { getUserInfo } = useConversations();
  const { user } = getUserInfo(router.query.id as string);

  const query = useQuery(
    `get-chats-${user?._id}`,
    () => getChats(user?._id || ''),
    {
      enabled: !!user?._id,
      refetchOnWindowFocus: false,
      onSuccess: (_chats: Chat[]) => setChats(_chats),
    },
  );

  return {
    chats,
    ...query,
  };
};

export default useChats;
