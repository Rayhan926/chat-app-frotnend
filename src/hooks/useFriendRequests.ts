import { friendRequestsAtom } from '@atoms';
import { getFriendRequests } from '@client/queries';
import { ChatBoxProps } from '@types';
import { useAtom } from 'jotai';
import { useQuery } from 'react-query';

const useFriendRequests = () => {
  const [friendRequests, setFriendRequests] = useAtom(friendRequestsAtom);

  const query = useQuery('get-friend-requests', getFriendRequests, {
    onSuccess: (requests: ChatBoxProps[]) => setFriendRequests(requests),
    enabled: false,
  });

  const removeFromList = (id: string) => {
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== id),
    );
  };
  return {
    friendRequests,
    removeFromList,
    ...query,
  };
};

export default useFriendRequests;
