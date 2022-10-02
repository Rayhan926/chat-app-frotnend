import AddFriendFloatButton from '@components/AddFriendFloatButton';
import useSession from '@hooks/useSession';
import useUser from '@hooks/useUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HiOutlineUsers, HiUsers } from 'react-icons/hi';
import { IoChatbubblesOutline, IoChatbubblesSharp } from 'react-icons/io5';
import TabButton from '../TabButton';

const Footer = () => {
  const { session } = useSession();
  const hasNewFriendRequestsNotification =
    session?.user?.newFriendRequestsNotification;
  const router = useRouter();
  const { updateUser } = useUser();

  useEffect(() => {
    if (router.pathname === '/requests') {
      // updateUser({ newFriendRequestsNotification: 0 });
    }
  }, [router.pathname, updateUser]);

  return (
    <footer className="relative">
      <div className="flex justify-between items-center bg-white border-t border-dark-100">
        <TabButton
          icon={<IoChatbubblesOutline size={25} />}
          activeIcon={<IoChatbubblesSharp size={25} />}
          path="/"
        />
        <AddFriendFloatButton />
        <TabButton
          activeIcon={<HiUsers size={25} />}
          icon={<HiOutlineUsers size={25} />}
          className="relative"
          extraChildren={
            !!hasNewFriendRequestsNotification && (
              <span className="w-4 h-4 bg-red-500 rounded-full absolute bottom-[calc(100%-8px)] left-[calc(100%-8px)] text-[10px] text-white flex justify-center items-center">
                {hasNewFriendRequestsNotification}
              </span>
            )
          }
          path="/requests"
        />
      </div>
    </footer>
  );
};

export default Footer;
