import useSession from '@hooks/useSession';
import useTheme from '@hooks/useTheme';

import { motion } from 'framer-motion';
import { AiOutlineUser } from 'react-icons/ai';
import { BiMoon, BiSun } from 'react-icons/bi';
import { BsEnvelope } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import Header from './components/Header';
import List from './components/List';
import ProfilePicture from './components/ProfilePicture';

const Profile = () => {
  const { isLightTheme, setTheme } = useTheme();
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
            className="text-[20px] font-semibold text-dark-900 dark:text-white text-center"
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
          icon={<BiSun size={18} />}
          title="Appearance"
          subtitle={`Current theme: ${isLightTheme ? 'Light' : 'Dark'}`}
          value={
            <>
              <button
                onClick={() => setTheme(isLightTheme ? 'dark' : 'light')}
                className="w-10 h-10 rounded-full flex justify-center items-center bg-dark-100 dark:bg-dark-mode-700"
              >
                {isLightTheme ? <BiMoon size={22} /> : <BiSun size={22} />}
              </button>
            </>
          }
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
