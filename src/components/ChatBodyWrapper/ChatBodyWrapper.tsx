import { ReactNode } from 'react';

const ChatBodyWrapper = ({ children }:{children:ReactNode}) => (
    <main id='chat_body_wrapper' className="w-full h-screen sm:h-auto sm:w-[400px] sm:aspect-[3/5.5] relative sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 bg-white sm:rounded-[30px] overflow-hidden">
        {children}
    </main>
);

export default ChatBodyWrapper;
