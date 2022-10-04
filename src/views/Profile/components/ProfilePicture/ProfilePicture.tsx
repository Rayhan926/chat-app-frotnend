/* eslint-disable max-len */
import useSession from '@hooks/useSession';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ProfilePicture = () => {
  const { session } = useSession();

  const user = session?.user;

  return (
    <motion.div
      layoutId="avatarCircle"
      className="relative w-[30%] mx-auto aspect-square"
    >
      <div className=" bg-dark-100 dark:bg-dark-mode-700 rounded-full overflow-hidden relative w-full aspect-square">
        {user?.avatar && (
          <Image
            src={user.avatar}
            alt={user?.name}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      {/* <div className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-dark-200 border-[3px] border-white grid place-items-center cursor-pointer hover:scale-105 duration-150">
        <HiOutlineCamera size={18} className="-translate-y-px" />
      </div> */}
    </motion.div>
  );
};

export default ProfilePicture;
