/* eslint-disable @next/next/no-img-element */
import useSession from '@hooks/useSession';
import { Chat } from '@types';
import { cx, getFullPath } from '@utils';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { BiErrorAlt } from 'react-icons/bi';
import {
  IoCheckmarkDoneSharp,
  IoCheckmarkSharp,
  IoEllipsisHorizontalSharp,
} from 'react-icons/io5';

const MessageUploadProgressIndicatior = dynamic(
  () => import('../MessageUploadProgressIndicatior'),
);

const Message = ({
  message,
  senderId,
  status,
  createdAt,
  attachments = [],
  uploadProgress = null,
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
    <div className={cx(isMe ? '__its_me' : '__its_not_me')}>
      <div
        // rounded-[20px]
        className={cx(
          'max-w-[75%] w-fit relative overflow-hidden',
          isMe
            ? 'bg-primary text-white ml-auto rounded-xl'
            : 'bg-dark-100 text-dark-900 rounded-xl',
        )}
      >
        {/** Attachments Preview --Start-- */}
        {hasAttachments && (
          <div className="relative">
            {isSending && (
              <MessageUploadProgressIndicatior percentage={uploadProgress} />
            )}

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
                  className="bg-white first:rounded-t-[10px] last:rounded-b-[10px] overflow-hidden [&>span]:!block"
                  key={attachment._id}
                >
                  <Image
                    alt=""
                    src={
                      attachment?.preview || getFullPath(attachment?.path || '')
                    }
                    width={attachment.width}
                    height={attachment.height}
                    className="w-full"
                  />
                  {/* <img
                  alt=""
                  src={
                    attachment?.preview || getFullPath(attachment?.path || '')
                  }
                  // width={attachment.width}
                  // height={attachment.height}
                  className="w-full"
                /> */}
                </div>
              ))}
            </div>
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
