import { sendMessage } from '@client/mutations';
import useConversations from '@hooks/useConversations';
import { cx } from '@utils';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { IoMdSend } from 'react-icons/io';
import { useMutation } from 'react-query';
import TextareaAutosize from 'react-textarea-autosize';

// eslint-disable-next-line operator-linebreak
const sideBtnStyle =
  'rounded-full flex justify-center items-center h-full text-dark-900 cursor-pointer';

const SendMessageInput = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const { getUserInfo } = useConversations();

  const { mutate } = useMutation(sendMessage, {
    onSuccess: () => {
      setMessage('');
    },
  });

  const { user } = getUserInfo(router.query.id as string);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?._id || !message.trim()) return;

    mutate({
      message: message.trim(),
      sendTo: user?._id,
    });
  };

  return (
    <form
      className="shrink-0 flex gap-1 items-end pb-3.5 pt-2 px-4"
      onSubmit={handleSubmit}
    >
      {/** Input --Start-- */}
      <div className="grow flex rounded-[25px] items-center bg-dark-100 min-h-11">
        <button type="button" className={cx('pl-3', sideBtnStyle)}>
          <BsEmojiSmile size={20} />
        </button>
        <TextareaAutosize
          maxRows={4}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none outline-none py-2.5 px-3 text-dark-900 placeholder:text-dark-700 bg-transparent"
        />
        <button type="button" className={cx('pr-3', sideBtnStyle)}>
          <ImAttachment size={18} />
        </button>
      </div>
      {/** Input --End-- */}

      {/** Send Button --Start-- */}
      <button
        type="submit"
        className="outline-none w-11 h-11 rounded-full bg-primary shrink-0 text-white flex justify-center items-center"
      >
        <IoMdSend size={20} />
      </button>
      {/** Send Button --End-- */}
    </form>
  );
};

export default SendMessageInput;
