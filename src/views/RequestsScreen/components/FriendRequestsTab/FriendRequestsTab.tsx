/* eslint-disable indent */

import NoData from '@components/NoData/NoData';
import Spinner from '@components/Spinner';
import useFriendRequests from '@hooks/useFriendRequests';
import { useEffect } from 'react';
import FriendRequest from './components/FriendRequest';

const FriendRequestsTab = () => {
  const { refetch, isLoading, isIdle, isError, friendRequests } =
    useFriendRequests();

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div className="h-full overflow-y-auto scrollbar-none">
      {isLoading || isIdle ? (
        <Spinner />
      ) : isError ? (
        'Error'
      ) : friendRequests.length <= 0 ? (
        <NoData text="No Friend Requests" />
      ) : (
        friendRequests.map((request) => (
          <FriendRequest {...request} key={request?._id} />
        ))
      )}
    </div>
  );
};

export default FriendRequestsTab;
