import AddFriendFloatButton from '@components/AddFriendFloatButton';
import SingleConversation from '@components/SingleConversation';
import useConversations from '@hooks/useConversations';
import ConversationSkelenton from '@skelentons/ConversationSkelenton';
import { Conversation } from '@types';
import Header from '@views/HomeScreen/components/Header';

const HomeScreen = () => {
  const { isIdle, isLoading, conversations } = useConversations();
  return (
    <div className="h-full flex flex-col relative">
      <Header />
      <div className="grow overflow-y-auto scrollbar-none py-2.5">
        {isIdle || isLoading
          ? [...Array(10).keys()].map((e) => <ConversationSkelenton key={e} />)
          : conversations &&
            (conversations as any).map((conversation: Conversation) => (
              <SingleConversation {...conversation} key={conversation._id} />
            ))}
      </div>
      <AddFriendFloatButton />
    </div>
  );
};

export default HomeScreen;
