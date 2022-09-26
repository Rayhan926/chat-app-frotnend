/* eslint-disable max-len */
import useChats from '@hooks/useChats';
import useConversations from '@hooks/useConversations';
import useDropFiles from '@hooks/useDropFiles';
import useSession from '@hooks/useSession';
import useSocket from '@hooks/useSocket';
import { Chat } from '@types';
import { cx, scrollChatScreenToBottom } from '@utils';
import { ReactNode, useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatBodyWrapper = ({ children }: { children: ReactNode }) => {
  const { getRootProps, isDragActive } = useDropFiles({ noClick: true });
  const { setSocket, socket } = useSocket();
  const { session } = useSession();
  const {
    addChat,
    activeConversation,
    updateAllChatsStatusToSeen,
    addTypingToChatList,
    removeTypingFromChatList,
  } = useChats();
  const { updateConversation, getUserInfo, conversations, updateTypingStatus } =
    useConversations();

  useEffect(() => {
    const _socket = io('http://localhost:8080');

    const handler = () => {
      setSocket(_socket);
    };
    _socket.on('connect', handler);

    return () => {
      _socket.off('connect', handler);
    };
  }, [setSocket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('new-message', (chat: Chat) => {
      if (activeConversation === chat.senderId) {
        updateConversation(chat.senderId, {
          lastMessage: chat,
        });
        addChat(chat, true);
        socket.emit('saw-message', {
          sawBy: session?.user?._id,
          sawUserId: activeConversation,
        });
      } else {
        updateConversation(chat.senderId, {
          lastMessage: chat,
          unseenMessageCount:
            (getUserInfo(chat.senderId)?.unseenMessageCount || 0) + 1,
        });
      }
    });

    socket.on('seen-messages', (data) => {
      if (activeConversation === data?.seenBy) {
        updateAllChatsStatusToSeen();
      } else {
        updateConversation(data?.seenBy, {
          lastMessage: {
            ...getUserInfo(data?.seenBy)?.lastMessage,
            status: 'seen',
          },
        });
      }
    });

    socket.on('typing', (data) => {
      updateTypingStatus(data?.from || '', data?.typingStatus);
      if (data?.from === activeConversation) {
        if (data?.typingStatus) {
          addTypingToChatList();
          scrollChatScreenToBottom();
        } else {
          removeTypingFromChatList();
        }
      }
    });

    return () => {
      socket.off('new-message');
      socket.off('seen-messages');
      socket.off('saw-message');
      socket.off('typing');
    };
  }, [
    activeConversation,
    addChat,
    setSocket,
    updateAllChatsStatusToSeen,
    updateConversation,
    session?.user?._id,
    conversations,
    getUserInfo,
    socket,
    updateTypingStatus,
    addTypingToChatList,
    removeTypingFromChatList,
  ]);

  return (
    <main
      {...getRootProps()}
      id="chat_body_wrapper"
      className={cx(
        'w-full h-screen sm:h-auto sm:w-[400px] sm:aspect-[3/5.5] relative sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 bg-white sm:rounded-[30px] overflow-hidden',
      )}
    >
      <div
        className={cx(
          'absolute top-0 left-0 w-full h-full bg-dark-900/50 duration-300 z-50 flex items-center justify-center text-center text-xl text-white font-medium',
          isDragActive ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        Drop files here
      </div>
      {children}
    </main>
  );
};

export default ChatBodyWrapper;
