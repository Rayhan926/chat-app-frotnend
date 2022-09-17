/* eslint-disable indent */

import Error from '@components/Error/Error';
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
    <div className="grow overflow-y-auto scrollbar-none">
      {isLoading || isIdle ? (
        <Spinner />
      ) : isError ? (
        <Error text="Failed to load friend requests" />
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
