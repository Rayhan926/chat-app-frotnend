import Spinner from '@components/Spinner';
import useChats from '@hooks/useChats';
import Header from './components/Header';
import Message from './components/Message';
import SendMessageInput from './components/SendMessageInput';

const ChatScreen = () => {
  const { chats, isLoading, isError, isIdle, organizeChats } = useChats();

  return (
    <div className="h-full flex flex-col">
      <Header />
      <div
        className="__px grow space-y-3 overflow-y-auto py-4 pb-2 scrollbar-none scroll-smooth"
        id="messages_wrapper"
      >
        {isLoading || isIdle ? (
          <Spinner />
        ) : isError ? (
          'Error'
        ) : (
          <>
            {organizeChats(chats).map((chatBlocks, index) => {
              return (
                <div key={index} className="space-y-0.5">
                  {chatBlocks.map((chat) => (
                    <Message {...chat} key={chat._id} />
                  ))}
                </div>
              );
            })}
          </>
        )}
      </div>
      <SendMessageInput />
    </div>
  );
};

export default ChatScreen;
