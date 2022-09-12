import Header from './components/Header';
import Message from './components/Message';
import SendMessageInput from './components/SendMessageInput';

const ChatScreen = () => (
  <div className="h-full flex flex-col">
    <Header />
    <div className="__px grow space-y-3 overflow-y-auto py-4 pb-2 scrollbar-none">
      {[...Array(20).keys()].map((e) => (
        <Message isMe={e % 2 === 0} key={e} />
      ))}
    </div>
    <SendMessageInput />
  </div>
);

export default ChatScreen;
