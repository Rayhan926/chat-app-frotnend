import { useCallback, useEffect } from 'react';
import useChats from './useChats';
import useMessageInput from './useMessageInput';
import useSession from './useSession';
import useSocket from './useSocket';

let timeout: any = null;
let isTypingStarted: boolean = false;
const useTyping = () => {
  const { socket } = useSocket();
  const { activeConversation } = useChats();
  const { session } = useSession();
  const { message } = useMessageInput();

  const clearTimeOut = useCallback(() => {
    clearTimeout(timeout);
    timeout = null;
  }, []);

  const cancelTyping = useCallback(() => {
    socket?.emit('typing', {
      typingStatus: false,
      to: activeConversation,
      from: session?.user?._id,
    });
    isTypingStarted = false;
    clearTimeOut();
  }, [socket, activeConversation, session, clearTimeOut]);

  useEffect(() => {
    const msgLength = message.length;
    if (msgLength <= 0) {
      return;
    }

    if (!isTypingStarted) {
      socket?.emit('typing', {
        typingStatus: true,
        to: activeConversation,
        from: session?.user?._id,
      });
      isTypingStarted = true;
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      cancelTyping();
    }, 1500);
  }, [message, cancelTyping, activeConversation, session, socket]);

  return {
    cancelTyping,
    clearTimeOut,
  };
};

export default useTyping;
