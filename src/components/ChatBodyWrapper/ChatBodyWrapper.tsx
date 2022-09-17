/* eslint-disable max-len */
import { cx } from '@utils';
import { ReactNode } from 'react';

const ChatBodyWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main
      id="chat_body_wrapper"
      className={cx(
        'w-full h-screen sm:h-auto sm:w-[400px] sm:aspect-[3/5.5] relative sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 bg-white sm:rounded-[30px] overflow-hidden',
      )}
    >
      {/* <div
        className={cx(
          'absolute top-0 left-0 w-full h-full bg-dark-900/40 duration-300 z-50 flex items-center justify-center text-center text-xl text-white font-medium',
          isDragActive ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        Drop files here
      </div> */}
      {children}
    </main>
  );
};

export default ChatBodyWrapper;
