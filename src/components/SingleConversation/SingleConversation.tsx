import { Conversation } from '@types';
import { cx } from '@utils';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const SingleConversation = ({
  name,
  username,
  avatar,
  lastMessage,
  unseenMessageCount,
  status,
}: Conversation) => {
  const isOnline = status === 'online';
  // const isOffline = status === 'offline';

  console.log({ lastMessage, unseenMessageCount });

  return (
    <Link href={`/chat/${username}`}>
      <a className="flex items-center __px py-2.5 gap-4 cursor-pointer hover:bg-dark-100/40">
        {/** Avatar --Start-- */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-dark-100 shrink-0 overflow-hidden relative">
            <Image
              src={avatar || '/images/avatar.png'}
              alt={name}
              layout="fill"
            />
          </div>

          {/** Status Indication --Start-- */}
          <div
            className={cx(
              'w-3 h-3 border-2 border-white absolute bottom-0 right-0 rounded-full',
              isOnline ? 'bg-green-500' : 'bg-slate-400',
            )}
          ></div>
          {/** Status Indication --End-- */}
        </div>
        {/** Avatar --End-- */}

        {/** Name and last message --Start-- */}
        <div className="space-y-0.5">
          <h3 className="font-semibold text-base text-dark-900 line-clamp-1">
            {name}
          </h3>
          {lastMessage && (
            <p className="text-sm text-dark-800 line-clamp-1">
              {lastMessage.message}
            </p>
          )}
        </div>
        {/** Name and last message --End-- */}

        {/** Unseen message count and time --Start-- */}
        <div className="ml-auto flex flex-col items-end shrink-0 space-y-1">
          {lastMessage && (
            <p
              className={cx(
                'text-xs',
                unseenMessageCount ? 'text-primary' : 'text-dark-700',
              )}
            >
              {moment(lastMessage.createdAt).format('hh:mm A')}
            </p>
          )}
          {unseenMessageCount > 0 && (
            <div
              className={cx(
                'min-w-[20px] h-5 rounded-[10px] bg-primary flex justify-center items-center text-white text-[11px] font-light',
                unseenMessageCount.toString().length >= 3
                  ? 'px-1.5'
                  : 'px-[4px]',
              )}
            >
              {unseenMessageCount}
            </div>
          )}
        </div>
        {/** Unseen message count and time --End-- */}
      </a>
    </Link>
  );
};

export default SingleConversation;
