/* eslint-disable indent */

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
      {isLoading || isIdle
        ? 'Loading..'
        : isError
        ? 'Error'
        : friendRequests.map((request) => (
            <FriendRequest {...request} key={request?._id} />
          ))}
    </div>
  );
};

export default FriendRequestsTab;
