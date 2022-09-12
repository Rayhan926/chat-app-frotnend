import { MessageType } from '@types';
import { cx } from '@utils';

const Message = ({ isMe }: MessageType) => (
  <div>
    <div
      className={cx(
        'max-w-[75%] w-fit p-2 px-4 rounded-[20px]',
        isMe ? 'bg-primary text-white ml-auto' : 'bg-dark-100 text-dark-900',
      )}
    >
      Lorem ipsum dolor sit
    </div>
  </div>
);

export default Message;
