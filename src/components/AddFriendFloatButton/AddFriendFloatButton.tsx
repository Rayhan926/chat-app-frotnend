import SendFriendRequestDrawer from '@components/SendFriendRequestDrawer';
import { useOpenFriendRequestDrawer } from '@states';
import { BsPlusLg } from 'react-icons/bs';

const AddFriendFloatButton = () => {
  const [, setIsOpen] = useOpenFriendRequestDrawer();

  return (
    <>
      <SendFriendRequestDrawer />
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary rounded-full flex items-center justify-center absolute right-6 bottom-6 text-white outline-none float_btn_shadow hover:shadow-none duration-300 active:scale-75"
        >
          <BsPlusLg size={16} />
        </button>
      </div>
    </>
  );
};

export default AddFriendFloatButton;
