/* eslint-disable indent */
import MessageStatusIndicator from '@components/MessageStatusIndicator';
import useChats from '@hooks/useChats';
import useConversations from '@hooks/useConversations';
import useSession from '@hooks/useSession';
import { Conversation } from '@types';
import { cx } from '@utils';
import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoCamera } from 'react-icons/io5';

const SingleConversation = ({
  name,
  username,
  avatar,
  lastMessage,
  unseenMessageCount,
  status,
  _id,
  isTyping,
}: Conversation) => {
  const { setActiveConversation } = useChats();
  const { updateConversation } = useConversations();
  const isOnline = status === 'online';
  const hasAttachments = (lastMessage as any)?.attachments?.length > 0;
  const router = useRouter();
  const { session } = useSession();
  // console.log(lastMessage, name);
  const isLastMessageMine = lastMessage?.senderId === session?.user?._id;

  const onConversationClick = () => {
    setActiveConversation(_id);

    router.push(`/chat/${username}`).then(() => {
      updateConversation(_id, {
        unseenMessageCount: 0,
      });
    });
  };

  return (
    <div
      onClick={onConversationClick}
      className="flex items-center __px py-2.5 gap-4 cursor-pointer hover:bg-dark-100/40 dark:hover:bg-dark-mode-800"
    >
      {/** Avatar --Start-- */}
      <motion.div layoutId={`avatar-${username}`} className="relative">
        <div className="w-12 h-12 rounded-full bg-dark-100 dark:bg-dark-mode-700 shrink-0 overflow-hidden relative">
          <Image
            src={avatar || '/images/avatar.png'}
            alt={name}
            layout="fill"
          />
        </div>

        {/** Status Indication --Start-- */}
        <div
          className={cx(
            'w-3 h-3 border-2 border-white dark:border-dark-mode-900 absolute bottom-0 right-0 rounded-full',
            isOnline ? 'bg-green-500' : 'bg-slate-400 dark:bg-dark-mode-300',
          )}
        ></div>
        {/** Status Indication --End-- */}
      </motion.div>
      {/** Avatar --End-- */}

      {/** Name and last message --Start-- */}
      <div className="space-y-0.5">
        <h3 className="font-semibold text-base text-dark-900 dark:text-white line-clamp-1">
          {name}
        </h3>
        {/* <p className="text-[13px] leading-[13px]">Hello</p> */}
        {isTyping ? (
          <p className="text-[13px] leading-[13px] h-4 text-primary">
            Typing..
          </p>
        ) : (
          lastMessage && (
            <div className="text-[13px] leading-[13px] text-dark-800 dark:text-dark-mode-100 flex items-center gap-1 relative h-4">
              {isLastMessageMine && (
                <MessageStatusIndicator
                  status={lastMessage.status}
                  seenClassName="text-primary"
                />
              )}
              {hasAttachments && (
                <span
                  className={cx(
                    'inline text-dark-800 dark:text-dark-mode-100 absolute top-0 left-0',
                    isLastMessageMine ? 'left-4' : 'left-0',
                  )}
                >
                  <IoCamera size={16} />
                </span>
              )}
              <div className={cx(hasAttachments && 'pl-5')}>
                {lastMessage.message ? (
                  <p className="line-clamp-1 pb-0.5">{lastMessage.message}</p>
                ) : hasAttachments ? (
                  <span>Photo</span>
                ) : null}
              </div>
            </div>
          )
        )}
      </div>
      {/** Name and last message --End-- */}

      {/** Unseen message count and time --Start-- */}
      <div className="ml-auto flex flex-col items-end shrink-0 space-y-1">
        {lastMessage && (
          <p
            className={cx(
              'text-xs',
              unseenMessageCount
                ? 'text-primary'
                : 'text-dark-700 dark:text-dark-mode-300',
            )}
          >
            {moment(lastMessage.createdAt).format('hh:mm A')}
          </p>
        )}
        {unseenMessageCount > 0 && (
          <div
            className={cx(
              'min-w-[20px] h-5 rounded-[10px] bg-primary flex justify-center items-center text-white text-[11px] font-light',
              unseenMessageCount.toString().length >= 3 ? 'px-1.5' : 'px-[4px]',
            )}
          >
            {unseenMessageCount}
          </div>
        )}
      </div>
      {/** Unseen message count and time --End-- */}
    </div>
  );
};

export default SingleConversation;
