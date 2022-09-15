import { useOpenFriendRequestDrawer } from '@atoms';
import SendFriendRequestDrawer from '@components/SendFriendRequestDrawer';
import { BsPlusLg } from 'react-icons/bs';

const AddFriendFloatButton = () => {
  const [, setIsOpen] = useOpenFriendRequestDrawer();

  return (
    <>
      <SendFriendRequestDrawer />
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white outline-none float_btn_shadow hover:shadow-none duration-300 active:scale-75"
        >
          <BsPlusLg size={16} />
        </button>
      </div>
    </>
  );
};

export default AddFriendFloatButton;
