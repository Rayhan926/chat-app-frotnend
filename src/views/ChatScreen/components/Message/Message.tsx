import useSession from '@hooks/useSession';
import { Chat } from '@types';
import { cx } from '@utils';

const Message = ({ message, senderId }: Chat) => {
  const { session } = useSession();

  const isMe = senderId === session?.user?._id;

  return (
    <div>
      <div
        // rounded-[20px]
        className={cx(
          'max-w-[75%] w-fit rounded py-1.5 px-3 text-sm whitespace-pre-wrap',
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
