import { accpetFriendRequest } from '@client/mutations';
import Button from '@components/Button/Button';
import useFriendRequests from '@hooks/useFriendRequests';
import useRejectFriendRequest from '@hooks/useRejectFriendRequest';
import useToast from '@hooks/useToast';
import { ChatBoxProps } from '@types';
import Image from 'next/image';
import { useMutation } from 'react-query';

const FriendRequest = ({ avatar, _id, name }: ChatBoxProps) => {
  const { setToast } = useToast();
  const { removeFromList } = useFriendRequests();

  // accpet request
  const accept = useMutation(() => accpetFriendRequest(_id), {
    onSuccess: (res) => {
      removeFromList(_id);
      setToast({ message: res.data.message });
    },
    onError: (err: any) => setToast({ message: err.response.data.message }),
  });

  const reject = useRejectFriendRequest(_id, 'reject');

  return (
    <div className="flex items-center __px py-2.5 gap-4">
      <div className="w-12 h-12 rounded-full bg-dark-100 shrink-0 overflow-hidden relative">
        <Image src={avatar || '/images/avatar.png'} alt={name} layout="fill" />
      </div>
      <div>
        <h3 className="font-semibold text-base text-dark-900 line-clamp-1">
          {name}
        </h3>
      </div>

      <div className="flex gap-2 ml-auto shrink-0">
        <Button
          isLoading={reject.isLoading}
          onClick={() => reject.mutate()}
          className="bg-dark-100 text-dark-900"
        >
          Reject
        </Button>
        <Button isLoading={accept.isLoading} onClick={() => accept.mutate()}>
          Accept
        </Button>
      </div>
    </div>
  );
};

export default FriendRequest;
