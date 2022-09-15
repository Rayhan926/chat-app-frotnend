/* eslint-disable indent */

import NoData from '@components/NoData/NoData';
import Spinner from '@components/Spinner';
import useSentFriendRequests from '@hooks/useSentFriendRequests';
import { useEffect } from 'react';
import FriendRequestSent from './components/FriendRequestSent';

const SentFriendRequestsTab = () => {
  const { refetch, isLoading, isIdle, isError, sentFriendRequests } =
    useSentFriendRequests();

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div className="h-full overflow-y-auto scrollbar-none">
      {isLoading || isIdle ? (
        <Spinner />
      ) : isError ? (
        'Error'
      ) : sentFriendRequests.length <= 0 ? (
        <NoData text="No Friend Requests Sent yet!" />
      ) : (
        sentFriendRequests.map((request) => (
          <FriendRequestSent {...request} key={request?._id} />
        ))
      )}
    </div>
  );
};

export default SentFriendRequestsTab;
