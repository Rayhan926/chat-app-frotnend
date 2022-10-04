import Button from '@components/Button/Button';
import useCancelFriendRequest from '@hooks/useCancelFriendRequest';
import { ChatBoxProps } from '@types';
import Image from 'next/image';

const FriendRequestSent = ({ avatar, _id, name }: ChatBoxProps) => {
  const cancel = useCancelFriendRequest(_id, 'cancel');

  return (
    <div className="flex items-center __px py-2.5 gap-4">
      <div className="w-12 h-12 rounded-full bg-dark-100 dark:bg-dark-mode-700 shrink-0 overflow-hidden relative">
        <Image src={avatar || '/images/avatar.png'} alt={name} layout="fill" />
      </div>
      <div>
        <h3 className="font-semibold text-base text-dark-900 dark:text-white line-clamp-1">
          {name}
        </h3>
      </div>

      <div className="flex gap-2 ml-auto shrink-0">
        <Button
          isLoading={cancel.isLoading}
          onClick={() => cancel.mutate()}
          className="bg-dark-100 text-dark-900 dark:bg-dark-mode-700 dark:text-white"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default FriendRequestSent;
