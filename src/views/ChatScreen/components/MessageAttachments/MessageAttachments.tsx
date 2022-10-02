import useUploadOnProgress from '@hooks/useUploadOnProgress';
import { MessageAttachmentsProps } from '@types';
import { cx, getFullPath } from '@utils';
import Image from 'next/image';
import MessageUploadProgressIndicatior from '../MessageUploadProgressIndicatior';

const MessageAttachments = ({
  _id,
  isSending,
  isMe,
  message,
  attachments,
}: MessageAttachmentsProps) => {
  const { progressInfo } = useUploadOnProgress(_id);

  return (
    <div className="relative overflow-hidden">
      {(isSending || progressInfo?.progress) && (
        <MessageUploadProgressIndicatior percentage={progressInfo?.progress} />
      )}

      <div
        style={{
          // gridTemplateColumns: attachments.length >= 2 ? '1fr 1fr' : '1fr',
          gridTemplateColumns: '1fr',
        }}
        className={cx('p-[3px] grid gap-[3px]', message ? 'pb-0' : 'pb-[3px]')}
      >
        {attachments?.map((attachment) => (
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
              src={attachment?.preview || getFullPath(attachment?.path || '')}
              width={attachment.width}
              height={attachment.height}
              objectFit="contain"
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageAttachments;
