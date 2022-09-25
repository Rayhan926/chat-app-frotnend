/* eslint-disable max-len */
import useChats from '@hooks/useChats';
import useDropFiles from '@hooks/useDropFiles';
import useSocket from '@hooks/useSocket';
import { Chat } from '@types';
import { cx } from '@utils';
import { ReactNode } from 'react';
import { useEffectOnce } from 'react-use';
import { io } from 'socket.io-client';

const ChatBodyWrapper = ({ children }: { children: ReactNode }) => {
  const { getRootProps, isDragActive } = useDropFiles({ noClick: true });
  const { setSocket } = useSocket();
  const { addChat } = useChats();

  useEffectOnce(() => {
    const socket = io('http://localhost:8080');

    const handler = () => {
      setSocket(socket);
      console.log(socket.id);
    };

    socket.on('connect', handler);

    socket.on('sendChat', (chat: Chat) => {
      addChat(chat, true);
    });

    return () => {
      socket.off('connect', handler);
      socket.off('sendChat');
    };
  });

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
