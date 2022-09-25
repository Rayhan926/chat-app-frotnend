/* eslint-disable max-len */
import useChats from '@hooks/useChats';
import useConversations from '@hooks/useConversations';
import useDropFiles from '@hooks/useDropFiles';
import useSession from '@hooks/useSession';
import useSocket from '@hooks/useSocket';
import { Chat } from '@types';
import { cx } from '@utils';
import { ReactNode, useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatBodyWrapper = ({ children }: { children: ReactNode }) => {
  const { getRootProps, isDragActive } = useDropFiles({ noClick: true });
  const { setSocket } = useSocket();
  const { session } = useSession();
  const { addChat, activeConversation, updateAllChatsStatusToSeen } =
    useChats();
  const { updateConversation, getUserInfo, conversations } = useConversations();

  useEffect(() => {
    const socket = io('http://localhost:8080');

    const handler = () => {
      setSocket(socket);
    };

    socket.on('connect', handler);

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

    // socket.on('saw-message', (data) => {
    //   console.log(data);
    //   if (activeConversation === data?.sawBy) {
    //     updateAllChatsStatusToSeen();
    //   }
    // });

    socket.on('seen-messages', (data) => {
      if (activeConversation === data?.seenBy) {
        updateAllChatsStatusToSeen();
      }
    });

    return () => {
      socket.off('connect', handler);
      socket.off('new-message');
      socket.off('seen-messages');
      socket.off('saw-message');
    };
  }, [
    activeConversation,
    addChat,
    setSocket,
    updateAllChatsStatusToSeen,
    updateConversation,
    session?.user?._id,
    conversations,
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
