/* eslint-disable no-confusing-arrow */
import { activeConversationAtom, chatsAtom } from '@atoms';
import { getChats } from '@client/queries';
import { Chat } from '@types';
import { scrollChatScreenToBottom } from '@utils';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { v4 as uuid } from 'uuid';
import useConversations from './useConversations';
import useSession from './useSession';

const useChats = () => {
  const router = useRouter();
  const [activeConversation, setActiveConversation] = useAtom(
    activeConversationAtom,
  );
  const { session } = useSession();
  const [chats, setChats] = useAtom(chatsAtom);
  const { getUserInfo } = useConversations();
  const user = getUserInfo(router.query.id as string);

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

  // console.log({ ss: query.data });

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

  const addChat = useCallback(
    (chat: Chat, scroll?: boolean) => {
      setChats((prevChats) => [
        ...prevChats,
        {
          status: 'sending',
          createdAt: Date.now() as unknown as Date,
          uploadProgress: null,
          ...chat,
        },
      ]);

      if (scroll) {
        setTimeout(() => {
          scrollChatScreenToBottom();
        }, 80);
      }
    },
    [setChats],
  );

  const updateChat = useCallback(
    (id: string, data: {}) => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === id ? { ...chat, ...data } : chat,
        ),
      );
    },
    [setChats],
  );

  const replaceChat = useCallback(
    (ordinaryId: string, newChatData: Chat) => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === ordinaryId ? { ...chat, ...newChatData } : chat,
        ),
      );
    },
    [setChats],
  );

  const addTypingToChatList = useCallback(() => {
    setChats((prevChats) => {
      return [
        ...prevChats,
        {
          _id: uuid(),
          message: null,
          isTyping: true,
          senderId: activeConversation,
          receiverId: session?.user?._id,
        } as any,
      ];
    });
  }, [activeConversation, session?.user?._id, setChats]);

  const removeTypingFromChatList = useCallback(() => {
    setChats((prevChats) => prevChats.filter((chat) => !chat?.isTyping));
  }, [setChats]);

  const updateAllChatsStatusToSeen = useCallback(() => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.status !== 'seen' ? { ...chat, status: 'seen' } : chat,
      ),
    );
  }, [setChats]);

  useEffect(() => {
    if (chats.length === 1) {
      document
        .querySelectorAll('.__message_wrapper')[0]
        ?.classList?.add('__last');
    } else {
      document
        .querySelectorAll('.__message_wrapper')
        .forEach((e) => e.classList.remove('__last'));
    }
  }, [chats]);

  return {
    chats,
    addChat,
    setChats,
    updateChat,
    replaceChat,
    organizeChats,
    activeConversation,
    addTypingToChatList,
    setActiveConversation,
    removeTypingFromChatList,
    updateAllChatsStatusToSeen,
    ...query,
  };
};

export default useChats;
