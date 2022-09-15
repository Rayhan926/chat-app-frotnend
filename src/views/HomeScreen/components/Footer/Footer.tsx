import AddFriendFloatButton from '@components/AddFriendFloatButton';
import { HiOutlineUsers, HiUsers } from 'react-icons/hi';
import { IoChatbubblesOutline, IoChatbubblesSharp } from 'react-icons/io5';
import TabButton from '../TabButton';

const Footer = () => {
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
          path="/requests"
        />
      </div>
    </footer>
  );
};

export default Footer;
