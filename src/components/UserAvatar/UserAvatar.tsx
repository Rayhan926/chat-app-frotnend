/* eslint-disable no-underscore-dangle */
import useSession from '@hooks/useSession';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';

const UserAvatar = () => {
  const { session } = useSession();
  const user = session?.user;

  const router = useRouter();

  return (
    <motion.div
      layoutId="avatarCircle"
      className="w-10 h-10 rounded-full bg-dark-100 dark:bg-dark-mode-700 relative overflow-hidden cursor-pointer"
      onClick={() => router.push('/profile')}
    >
      {user?.avatar ? (
        <Image layout="fill" src={user?.avatar} alt={user?.name || ''} />
      ) : (
        <Skeleton width={40} height={40} circle />
      )}
    </motion.div>
  );
};

export default UserAvatar;
