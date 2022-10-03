import useSession from '@hooks/useSession';

import { motion } from 'framer-motion';
import { AiOutlineUser } from 'react-icons/ai';
import { BsEnvelope } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import Header from './components/Header';
import List from './components/List';
import ProfilePicture from './components/ProfilePicture';

const Profile = () => {
  const { session, logout } = useSession();

  const user = session?.user;

  return (
    <div className="flex flex-col h-full">
      <Header />

      <div className="grow flex flex-col">
        {/** Picture And Name --Start-- */}
        <div className="py-7 space-y-2">
          <ProfilePicture />
          <motion.h1
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              damping: 0,
            }}
            className="text-[20px] font-semibold text-dark-900 text-center"
          >
            {user?.name}
          </motion.h1>
        </div>
        {/** Picture And Name --End-- */}

        {/** Lists --Start-- */}
        <List
          icon={<BsEnvelope size={18} />}
          title="Email"
          value={user?.email}
        />
        <List
          icon={<AiOutlineUser size={18} />}
          title="Username"
          value={user?.username}
        />
        <List
          icon={<MdLogout size={18} />}
          title="Logout"
          className="mt-auto pb-5 pt-4 bg-red-500/5 hover:bg-red-500/10 !text-red-500 cursor-pointer"
          onClick={logout}
        />
        {/** Lists --End-- */}
      </div>
    </div>
  );
};

export default Profile;
