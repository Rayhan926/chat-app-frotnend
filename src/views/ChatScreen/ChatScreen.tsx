import useChats from '@hooks/useChats';
import Header from './components/Header';
import Message from './components/Message';
import SendMessageInput from './components/SendMessageInput';

const ChatScreen = () => {
  const { chats } = useChats();

  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="__px grow space-y-3 overflow-y-auto py-4 pb-2 scrollbar-none">
        {chats.map((chat) => (
          <Message {...chat} key={chat._id} />
        ))}
      </div>
      <SendMessageInput />
    </div>
  );
};

export default ChatScreen;
