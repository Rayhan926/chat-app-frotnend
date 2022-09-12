import { ReactNode } from 'react';

const ChatBodyWrapper = ({ children }:{children:ReactNode}) => (
    <main className="w-[400px] aspect-[3/5.5] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-[30px] overflow-hidden">
        {children}
    </main>
);

export default ChatBodyWrapper;
