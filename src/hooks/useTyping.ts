import { typingAtom } from '@atoms';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import useChats from './useChats';
import useMessageInput from './useMessageInput';
import useSession from './useSession';
import useSocket from './useSocket';

let timeout: any;
let isTypingStarted: boolean = false;
const useTyping = () => {
  const [isTyping, setIsTyping] = useAtom(typingAtom);
  const { socket } = useSocket();
  const { activeConversation } = useChats();
  const { session } = useSession();
  const { message } = useMessageInput();

  const cancelTyping = useCallback(() => {
    socket?.emit('typing', {
      typingStatus: false,
      to: activeConversation,
      from: session?.user?._id,
    });
    setIsTyping(false);
    isTypingStarted = false;
    clearTimeout(timeout);
  }, [socket, activeConversation, session, setIsTyping]);

  useEffect(() => {
    const msgLength = message.length;
    if (msgLength <= 0) {
      cancelTyping();
    }
  }, [message, cancelTyping]);

  const trackIsTyping = useCallback(() => {
    if (!isTypingStarted) {
      setIsTyping(true);
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
    }, 2000);
  }, [setIsTyping, socket, activeConversation, session, cancelTyping]);

  return {
    isTyping,
    trackIsTyping,
    cancelTyping,
  };
};

export default useTyping;
