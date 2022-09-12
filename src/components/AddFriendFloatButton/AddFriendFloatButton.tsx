import { BsPlusLg } from 'react-icons/bs';

// left-1/2 -translate-x-1/2 bottom-7
const AddFriendFloatButton = () => (
  <button className="w-14 h-14 bg-primary rounded-full flex items-center justify-center absolute right-6 bottom-6 text-white outline-none float_btn_shadow hover:shadow-none duration-300 active:scale-75">
    <BsPlusLg size={16} />
  </button>
);

export default AddFriendFloatButton;
