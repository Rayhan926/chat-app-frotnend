/* eslint-disable no-underscore-dangle */
import useSession from '@hooks/useSession';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

const UserAvatar = () => {
  const { session } = useSession();
  const user = session?.user;

  const router = useRouter();

  return (
    <motion.div
      layoutId="avatarCircle"
      className="w-10 h-10 rounded-full bg-dark-100 relative overflow-hidden cursor-pointer"
      onClick={() => router.push('/profile')}
    >
      <Image
        layout="fill"
        src={user?.avatar || '/images/avatar.png'}
        alt={user?.name || ''}
      />
    </motion.div>
  );
};

export default UserAvatar;
