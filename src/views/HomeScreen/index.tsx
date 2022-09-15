/* eslint-disable indent */
import NoData from '@components/NoData/NoData';
import SingleConversation from '@components/SingleConversation';
import useConversations from '@hooks/useConversations';
import HomepageLayout from '@layouts/HomepageLayout';
import ConversationSkelenton from '@skelentons/ConversationSkelenton';
import { useEffect } from 'react';

const HomeScreen = () => {
  const { isIdle, isLoading, data, isError, refetch } = useConversations();

  useEffect(() => {
    if (!isIdle) return;
    const timeout = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(timeout);
  }, [isIdle, refetch]);

  return (
    <HomepageLayout>
      {isIdle || isLoading ? (
        [...Array(10).keys()].map((e) => <ConversationSkelenton key={e} />)
      ) : isError ? (
        'Error'
      ) : (data as any)?.length <= 0 ? (
        <NoData text="No Conversation Found" />
      ) : (
        Array.isArray(data) &&
        data.map((conversation) => (
          <SingleConversation {...conversation} key={conversation._id} />
        ))
      )}
    </HomepageLayout>
  );
};

export default HomeScreen;
