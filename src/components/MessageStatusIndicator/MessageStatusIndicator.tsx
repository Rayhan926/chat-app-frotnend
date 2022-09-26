import { MessageStatusIndicatorProps } from '@types';
import { cx } from '@utils';
import { BiErrorAlt } from 'react-icons/bi';
import {
  IoCheckmarkDoneSharp,
  IoCheckmarkSharp,
  IoEllipsisHorizontalSharp,
} from 'react-icons/io5';

const MessageStatusIndicator = ({
  status = 'sending',
  seenClassName,
}: MessageStatusIndicatorProps) => {
  const isSending = status === 'sending';
  const isError = status === 'error';
  const isSent = status === 'sent';
  const isDelivered = status === 'delivered';
  const isSeen = status === 'seen';

  return (
    <span className="w-3 inline">
      {isSending ? (
        <IoEllipsisHorizontalSharp size={12} className="animate-pulse" />
      ) : isError ? (
        <BiErrorAlt size={12} />
      ) : isSent ? (
        <IoCheckmarkSharp size={12} />
      ) : isDelivered || isSeen ? (
        <IoCheckmarkDoneSharp
          size={12}
          className={cx(isDelivered ? 'opacity-50' : seenClassName)}
        />
      ) : (
        <BiErrorAlt size={12} />
      )}
    </span>
  );
};

export default MessageStatusIndicator;
