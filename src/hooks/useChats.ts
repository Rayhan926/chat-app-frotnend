/* eslint-disable no-confusing-arrow */
import { chatsAtom } from '@atoms';
import { getChats } from '@client/queries';
import { Chat } from '@types';
import { scrollChatScreenToBottom } from '@utils';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
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
      onSuccess: (_chats: Chat[]) => {
        setChats(_chats);
        scrollChatScreenToBottom();
      },
    },
  );

  const organizeChats = useCallback((__chats: Chat[]) => {
    const organizedChats: Chat[][] = [];
    let temporaryChats: Chat[] = [];
    let lastChat: Chat | null = null;

    __chats.forEach((chat) => {
      if (!lastChat || temporaryChats.length <= 0) {
        temporaryChats.push(chat);
        lastChat = chat;
        return;
      }

      if (chat.senderId === lastChat.senderId) {
        temporaryChats.push(chat);
        lastChat = chat;
      } else {
        organizedChats.push(temporaryChats);
        temporaryChats = [];
        temporaryChats.push(chat);
        lastChat = chat;
      }
    });
    organizedChats.push(temporaryChats);

    return organizedChats;
  }, []);

  const addChat = (chat: Chat) => {
    setChats((prevChats) => [
      ...prevChats,
      {
        status: 'sending',
        createdAt: Date.now() as unknown as Date,
        uploadProgress: null,
        ...chat,
      },
    ]);
  };

  const updateChat = (id: string, data: {}) => {
    setChats((prevChats) =>
      prevChats.map((chat) => (chat._id === id ? { ...chat, ...data } : chat)),
    );
  };

  const replaceChat = (ordinaryId: string, newChatData: Chat) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat._id === ordinaryId ? { ...chat, ...newChatData } : chat,
      ),
    );
  };

  useEffect(() => {
    if (chats.length === 1) {
      document
        .querySelectorAll('.__message_wrapper')[0]
        .classList.add('__last');
    } else {
      document
        .querySelectorAll('.__message_wrapper')
        .forEach((e) => e.classList.remove('__last'));
    }
  }, [chats]);

  return {
    chats,
    addChat,
    replaceChat,
    updateChat,
    organizeChats,
    ...query,
  };
};

export default useChats;
