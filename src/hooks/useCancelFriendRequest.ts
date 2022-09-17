import { cancelFriendRequest } from '@client/mutations';
import useSentFriendRequests from '@hooks/useSentFriendRequests';
import useToast from '@hooks/useToast';
import { useMutation } from 'react-query';

const useCancelFriendRequest = (_id: string, type?: 'reject' | 'cancel') => {
  const { setToast } = useToast();
  const { removeFromList } = useSentFriendRequests();

  // cancel request
  const cancel = useMutation(() => cancelFriendRequest(_id, type), {
    onSuccess: (res) => {
      removeFromList(_id);
      setToast({ message: res.data.message });
    },
    onError: (err: any) => setToast({ message: err.response.data.message }),
  });

  return {
    ...cancel,
  };
};

export default useCancelFriendRequest;
