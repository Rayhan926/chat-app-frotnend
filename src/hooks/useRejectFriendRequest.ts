import { cancelFriendRequest } from '@client/mutations';
import useToast from '@hooks/useToast';
import { useMutation } from 'react-query';
import useFriendRequests from './useFriendRequests';
import useUser from './useUser';

const useRejectFriendRequest = (_id: string, type?: 'reject' | 'cancel') => {
  const { setToast } = useToast();
  const { removeFromList } = useFriendRequests();
  const { updateUser } = useUser();
  // cancel request
  const cancel = useMutation(() => cancelFriendRequest(_id, type), {
    onSuccess: (res) => {
      removeFromList(_id);
      setToast({ message: res.data.message });
      type === 'reject' &&
        updateUser((user) => ({
          ...user,
          newFriendRequestsNotification: user.newFriendRequestsNotification - 1,
        }));
    },
    onError: (err: any) => setToast({ message: err.response.data.message }),
  });

  return {
    ...cancel,
  };
};

export default useRejectFriendRequest;
