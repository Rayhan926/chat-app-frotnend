import useSession from '@hooks/useSession';
import { Chat } from '@types';
import { cx, getFullPath } from '@utils';
import moment from 'moment';
import { BiErrorAlt } from 'react-icons/bi';
import {
  IoCheckmarkDoneSharp,
  IoCheckmarkSharp,
  IoEllipsisHorizontalSharp,
} from 'react-icons/io5';

const Message = ({
  message,
  senderId,
  status,
  createdAt,
  attachments = [],
}: Chat) => {
  const { session } = useSession();

  const isMe = senderId === session?.user?._id;
  const isSending = status === 'sending';
  const isError = status === 'error';
  const isSent = status === 'sent';
  const isDelivered = status === 'delivered';
  const isSeen = status === 'seen';
  const hasAttachments = attachments.length > 0;

  return (
    <div>
      <div
        // rounded-[20px]
        className={cx(
          'max-w-[75%] w-fit rounded-xl relative',
          isMe ? 'bg-primary text-white ml-auto' : 'bg-dark-100 text-dark-900',
        )}
      >
        {/** Attachments Preview --Start-- */}
        {hasAttachments && (
          <div
            style={{
              // gridTemplateColumns: attachments.length >= 2 ? '1fr 1fr' : '1fr',
              gridTemplateColumns: '1fr',
            }}
            className={cx(
              'p-[3px] grid gap-[3px]',
              message ? 'pb-0' : 'pb-[3px]',
            )}
          >
            {attachments.map((attachment) => (
              <div
                className="bg-white rounded-[10px] overflow-hidden"
                key={attachment._id}
              >
                <img src={getFullPath(attachment.path)} className="w-full" />
              </div>
            ))}
          </div>
        )}
        {/** Attachments Preview --End-- */}

        <div
          className={cx(
            message && 'pb-2 pt-1.5 px-3 text-sm whitespace-pre-wrap',
          )}
        >
          {/** Text Message --Start-- */}
          {message && <span>{message}</span>}
          {/** Text Message --End-- */}

          {/** Time And Message Status --Start-- */}
          <span
            className={cx(
              'text-[10px] pl-2 inline-flex items-center gap-1',
              !isMe && 'text-dark-800',
              !message
                ? 'absolute z-10 bottom-[3px] left-[3px] w-[calc(100%-6px)] pr-2 pb-1 pt-2 bg-gradient-to-t from-black/60 to-transparent rounded-b-[10px] flex justify-end !text-white'
                : 'translate-y-1 float-right',
            )}
          >
            <span>{moment(createdAt).format('HH:mm A')}</span>

            {isMe && (
              <span className="w-3 inline">
                {isSending ? (
                  <IoEllipsisHorizontalSharp
                    size={12}
                    className="animate-pulse"
                  />
                ) : isError ? (
                  <BiErrorAlt size={12} />
                ) : isSent ? (
                  <IoCheckmarkSharp size={12} />
                ) : isDelivered || isSeen ? (
                  <IoCheckmarkDoneSharp
                    size={12}
                    className={cx(isDelivered && 'opacity-50')}
                  />
                ) : (
                  <BiErrorAlt size={12} />
                )}
              </span>
            )}
          </span>
          {/** Time And Message Status --End-- */}
        </div>
      </div>
    </div>
  );
};

export default Message;
