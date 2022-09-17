import { BsEmojiSmile } from 'react-icons/bs';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import useMessageInput from '@hooks/useMessageInput';
import { cx } from '@utils';
import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const EmojiPicker = () => {
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const { message, setFieldValue } = useMessageInput();

  const emojiChangeHandler = (emoji: any) => {
    setFieldValue('message', message + emoji.native);
  };
  return (
    <div>
      <button
        type="button"
        className={'pl-3 __emoji_btn'}
        onClick={() => setIsOpenPicker((prev) => !prev)}
      >
        {isOpenPicker ? <IoCloseSharp size={20} /> : <BsEmojiSmile size={20} />}
      </button>

      <div
        className={cx(
          'absolute bottom-[calc(100%+8px)] left-0 w-full bg-white duration-500',
          isOpenPicker
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-5',
        )}
      >
        {/* <Picker /> */}
        <Picker
          data={data}
          onEmojiSelect={emojiChangeHandler}
          theme="light"
          skin={4}
          icons="outline"
          onClickOutside={() => isOpenPicker && setIsOpenPicker(false)}
        />
      </div>
    </div>
  );
};

export default EmojiPicker;
