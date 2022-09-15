import { friendRequestsAtom } from '@atoms';
import { getSentFriendRequests } from '@client/queries';
import { ChatBoxProps } from '@types';
import { useAtom } from 'jotai';
import { useQuery } from 'react-query';

const useSentFriendRequests = () => {
  const [sentFriendRequests, setSentFriendRequests] =
    useAtom(friendRequestsAtom);

  const query = useQuery('get-sent-friend-requests', getSentFriendRequests, {
    onSuccess: (requests: ChatBoxProps[]) => setSentFriendRequests(requests),
    enabled: false,
  });

  const removeFromList = (id: string) => {
    setSentFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== id),
    );
  };
  return {
    sentFriendRequests,
    removeFromList,
    ...query,
  };
};

export default useSentFriendRequests;
