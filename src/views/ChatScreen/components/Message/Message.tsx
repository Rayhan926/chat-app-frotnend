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
          'max-w-[75%] w-fit p-2 px-4 rounded-[20px] text-sm whitespace-pre-wrap',
          isMe
            ? 'bg-primary text-white ml-auto __its_me'
            : 'bg-dark-100 text-dark-900 __its_not_me',
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default Message;
