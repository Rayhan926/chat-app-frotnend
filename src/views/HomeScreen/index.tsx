/* eslint-disable indent */
import SingleConversation from '@components/SingleConversation';
import useConversations from '@hooks/useConversations';
import HomepageLayout from '@layouts/HomepageLayout';
import ConversationSkelenton from '@skelentons/ConversationSkelenton';
import { Conversation } from '@types';

const HomeScreen = () => {
  const { isIdle, isLoading, conversations } = useConversations();
  return (
    <HomepageLayout>
      {isIdle || isLoading
        ? [...Array(10).keys()].map((e) => <ConversationSkelenton key={e} />)
        : conversations &&
          (conversations as any).map((conversation: Conversation) => (
            <SingleConversation {...conversation} key={conversation._id} />
          ))}
    </HomepageLayout>
  );
};

export default HomeScreen;
