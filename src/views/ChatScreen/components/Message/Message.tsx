import useSession from '@hooks/useSession';
import { Chat } from '@types';
import { cx } from '@utils';

const Message = ({ message, senderId }: Chat) => {
  const { session } = useSession();

  const isMe = senderId === session?.user?._id;
  return (
    <div>
      <div
        className={cx(
          'max-w-[75%] w-fit p-2 px-4 rounded-[20px]',
          isMe ? 'bg-primary text-white ml-auto' : 'bg-dark-100 text-dark-900',
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default Message;
