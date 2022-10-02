/* eslint-disable max-len */
import useChats from '@hooks/useChats';
import useConversations from '@hooks/useConversations';
import useDropFiles from '@hooks/useDropFiles';
import useFriendRequests from '@hooks/useFriendRequests';
import useSentFriendRequests from '@hooks/useSentFriendRequests';
import useSession from '@hooks/useSession';
import useSocket from '@hooks/useSocket';
import useToast from '@hooks/useToast';
import useToggle from '@hooks/useToggle';
import useTyping from '@hooks/useTyping';
import useUser from '@hooks/useUser';
import { Chat, ChatBoxProps } from '@types';
import { cx, scrollChatScreenToBottom } from '@utils';
import { ReactNode, useEffect } from 'react';
import Div100vh from 'react-div-100vh';
import { io } from 'socket.io-client';

const ChatBodyWrapper = ({ children }: { children: ReactNode }) => {
  const { getRootProps, isDragActive } = useDropFiles({ noClick: true });
  const { setSocket, socket } = useSocket();
  const { session } = useSession();
  const { toggle } = useToggle();
  const { addToList, removeFromList: removeFriendRequestFromList } =
    useFriendRequests();
  const { removeFromList } = useSentFriendRequests();
  const { updateUser } = useUser();
  const { setToast } = useToast();

  const {
    addChat,
    activeConversation,
    updateAllChatsStatusToSeen,
    addTypingToChatList,
    removeTypingFromChatList,
  } = useChats();

  const {
    updateConversation,
    getUserInfo,
    conversations,
    updateTypingStatus,
    addNewConversation,
  } = useConversations();

  const { cancelTyping } = useTyping();

  useEffect(() => {
    const _socket = io(process.env.NEXT_PUBLIC_API_BASE_URL!);

    const handler = () => {
      setSocket(_socket);
    };
    _socket.on('connect', handler);

    return () => {
      _socket.off('connect', handler);
    };
  }, [setSocket, toggle]);

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

    socket.on('cancelTyping', cancelTyping);

    socket.on('user-online', (data) => {
      updateConversation(data.userId, {
        status: 'online',
      });
    });

    socket.on('user-offline', (data) => {
      updateConversation(data?.userId, {
        status: 'offline',
        lastSeen: data?.lastSeen,
      });
    });

    socket.on('new-friend-request', (data) => {
      addToList(data.user);
      setToast({
        message: `You just received a friend request from ${data.user.name}`,
      });
      updateUser({
        newFriendRequestsNotification: data.newFriendRequestsNotification,
      });
    });

    socket.on('friend-request-accept', (user: ChatBoxProps) => {
      setToast({
        message: `${user.name} just accept your friend request`,
      });
      removeFromList(user._id);
      addNewConversation(user as any);
    });

    socket.on('reject-friend-request', (user) => {
      removeFromList(user?._id);
      setToast({
        message: `${user?.name} rejected your friend request`,
      });
    });

    socket.on('cancel-friend-request', (user: ChatBoxProps) => {
      removeFriendRequestFromList(user._id);
      updateUser((u) => ({
        ...u,
        newFriendRequestsNotification: u.newFriendRequestsNotification - 1,
      }));
    });

    return () => {
      socket.off('new-message');
      socket.off('seen-messages');
      socket.off('saw-message');
      socket.off('typing');
      socket.off('cancelTyping');
      socket.off('user-online');
      socket.off('user-offline');
      socket.off('new-friend-request');
      socket.off('friend-request-accept');
      socket.off('reject-friend-request');
      socket.off('cancel-friend-request');
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
    cancelTyping,
    addToList,
    updateUser,
    removeFromList,
    setToast,
    addNewConversation,
    removeFriendRequestFromList,
  ]);

  return (
    <Div100vh>
      <main
        {...getRootProps()}
        id="chat_body_wrapper"
        className={cx(
          'w-full h-full sm:h-auto sm:w-[400px] sm:aspect-[3/5.5] relative sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 bg-white sm:rounded-[30px] overflow-hidden',
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
    </Div100vh>
  );
};

export default ChatBodyWrapper;
