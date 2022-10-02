import { friendRequestsSentAtom } from '@atoms';
import { getSentFriendRequests } from '@client/queries';
import { ChatBoxProps } from '@types';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { useQuery } from 'react-query';

const useSentFriendRequests = () => {
  const [sentFriendRequests, setSentFriendRequests] = useAtom(
    friendRequestsSentAtom,
  );

  const query = useQuery('get-sent-friend-requests', getSentFriendRequests, {
    onSuccess: (requests: ChatBoxProps[]) => setSentFriendRequests(requests),
    enabled: false,
  });

  const removeFromList = useCallback(
    (id: string) => {
      setSentFriendRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id),
      );
    },
    [setSentFriendRequests],
  );

  const addToList = useCallback(
    (newData: ChatBoxProps) => {
      setSentFriendRequests((prevRequests) => [...prevRequests, newData]);
    },
    [setSentFriendRequests],
  );
  return {
    sentFriendRequests,
    removeFromList,
    addToList,
    ...query,
  };
};

export default useSentFriendRequests;
