import useChats from '@hooks/useChats';
import useConversations from '@hooks/useConversations';
import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';

const Header = () => {
  const router = useRouter();
  const { getUserInfo } = useConversations();
  const { setActiveConversation, setChats } = useChats();

  const user = getUserInfo(router.query.id as string);

  useEffect(() => {
    if (user) {
      setActiveConversation(user._id);
    }
  }, [user, setActiveConversation]);

  const goBackHandler = () => {
    router.back();
    setActiveConversation(null);
    setChats([]);
  };

  return (
    <div className="flex items-center __px shrink-0 py-3 sm:py-4 gap-2 border-b border-dark-100 dark:border-dark-mode-800">
      {/** Go back --Start-- */}
      <button
        onClick={goBackHandler}
        className="w-9 h-9 shrink-0 rounded-full overflow-hidden flex justify-center items-center -ml-3 hover:bg-dark-100 dark:hover:bg-dark-mode-800 text-primary"
      >
        <FiChevronLeft size={20} />
      </button>
      {/** Go back --End-- */}

      {/** User Info --Start-- */}
      <div className="flex items-center gap-3">
        {user ? (
          <motion.div
            layoutId={`avatar-${router.query.id}`}
            className="w-9 h-9 shrink-0 rounded-full bg-dark-100 relative overflow-hidden"
          >
            <Image
              alt={user.name}
              src={user?.avatar || '/images/avatar.png'}
              layout="fill"
            />
          </motion.div>
        ) : (
          <Skeleton circle width={36} height={36} className="shrink-0" />
        )}
        <motion.div
          transition={{
            damping: 0,
          }}
          initial={{
            x: 50,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
        >
          {user ? (
            <>
              <h3 className="text-sm font-semibold text-dark-900 dark:text-white line-clamp-1">
                {user?.name}
              </h3>
              {user?.status === 'online' ? (
                <p className="text-[11px] text-green-600 capitalize line-clamp-1">
                  {user?.status}
                </p>
              ) : (
                <p className="text-[11px] text-dark-700 dark:text-dark-mode-300">
                  Last seen{' '}
                  {user?.lastSeen ? moment(user?.lastSeen).fromNow() : 'Nan'}
                </p>
              )}
            </>
          ) : (
            <>
              <Skeleton width={100} height={14} />
              <Skeleton width={38} height={11} className="mt-1.5" />
            </>
          )}
        </motion.div>
      </div>
      {/** User Info --End-- */}
    </div>
  );
};

export default Header;
