/* eslint-disable @next/next/no-img-element */
import MessageStatusIndicator from '@components/MessageStatusIndicator';
import useSession from '@hooks/useSession';
import useUploadOnProgress from '@hooks/useUploadOnProgress';
import { Chat } from '@types';
import { cx, getFullPath } from '@utils';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MessageUploadProgressIndicatior = dynamic(
  () => import('../MessageUploadProgressIndicatior'),
);

const Message = ({
  message,
  senderId,
  _id,
  status,
  createdAt,
  attachments = [],
  isTyping,
}: Chat) => {
  const { session } = useSession();
  const { progressInfo } = useUploadOnProgress(_id);
  const isMe = senderId === session?.user?._id;
  const isSending = status === 'sending';
  const hasAttachments = attachments.length > 0;

  if (isTyping) {
    return (
      <div
        className={cx(isMe ? '__its_me' : '__its_not_me', 'max-w-[75%] w-fit')}
      >
        <div className="pb-3 pt-2.5 px-3 flex items-center justify-center gap-[3px] typing_dots_wrapper bg-dark-100 h-[34px] text-dark-900 rounded-r-xl rounded-l-[2px]">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div
      id={_id}
      className={cx(isMe ? '__its_me' : '__its_not_me', '__message_wrapper')}
    >
      <div
        // rounded-[20px]
        className={cx(
          'max-w-[75%] w-fit relative overflow-hidden',
          isMe
            ? 'bg-primary text-white ml-auto rounded-l-xl rounded-r-[2px]'
            : 'bg-dark-100 text-dark-900 rounded-r-xl rounded-l-[2px]',
        )}
      >
        {/** Attachments Preview --Start-- */}
        {hasAttachments && (
          <div className="relative overflow-hidden">
            {isSending && (
              <MessageUploadProgressIndicatior
                percentage={progressInfo?.progress}
              />
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
                  className={cx(
                    'single_attachment bg-white overflow-hidden [&>span]:!block',
                    // isMe ? 'rounded-l-[10px]' : 'rounded-r-[10px]',
                    isMe
                      ? 'first:rounded-tl-[10px] last:rounded-bl-[10px]'
                      : 'first:rounded-tr-[10px] last:rounded-br-[10px]',
                  )}
                  key={attachment._id}
                >
                  <Image
                    alt=""
                    src={
                      attachment?.preview || getFullPath(attachment?.path || '')
                    }
                    width={attachment.width}
                    height={attachment.height}
                    objectFit="contain"
                    className="w-full"
                  />
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
              'message_time_and_status_overlay text-[10px] pl-2 inline-flex items-center gap-1 pb-1',
              !isMe ? 'text-dark-800 rounded-br-[10px]' : 'rounded-bl-[10px]',
              !message
                ? 'absolute z-10 bottom-[3px] left-[3px] w-[calc(100%-6px)] pr-2 pb-1 pt-2 bg-gradient-to-t from-black/60 to-transparent flex justify-end !text-white'
                : 'float-right translate-y-1',
            )}
          >
            <span>{moment(createdAt).format('HH:mm A')}</span>

            {isMe && <MessageStatusIndicator status={status} />}
          </span>
          {/** Time And Message Status --End-- */}
        </div>
      </div>
    </div>
  );
};

export default Message;
