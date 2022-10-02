import { friendRequestsAtom } from '@atoms';
import { getFriendRequests } from '@client/queries';
import { ChatBoxProps } from '@types';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { useQuery } from 'react-query';

const useFriendRequests = () => {
  const [friendRequests, setFriendRequests] = useAtom(friendRequestsAtom);

  const query = useQuery('get-friend-requests', getFriendRequests, {
    onSuccess: (requests: ChatBoxProps[]) => setFriendRequests(requests),
    enabled: false,
  });

  const removeFromList = useCallback(
    (id: string) => {
      setFriendRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id),
      );
    },
    [setFriendRequests],
  );

  const addToList = useCallback(
    (newData: ChatBoxProps) => {
      setFriendRequests((prevRequests) => [...prevRequests, newData]);
    },
    [setFriendRequests],
  );

  return {
    friendRequests,
    removeFromList,
    addToList,
    ...query,
  };
};

export default useFriendRequests;
