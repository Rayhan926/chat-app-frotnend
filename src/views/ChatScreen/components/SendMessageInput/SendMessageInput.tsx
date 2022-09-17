import { sendMessage } from '@client/mutations';
import { HOT_KEYS } from '@config/constants';
import useChats from '@hooks/useChats';
import useConversations from '@hooks/useConversations';
import useRandomId from '@hooks/useRandomId';
import useSession from '@hooks/useSession';
import { cx, scrollChatScreenToBottom } from '@utils';
import hotkeys from 'hotkeys-js';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { IoMdSend } from 'react-icons/io';
import { useMutation } from 'react-query';
import TextareaAutosize from 'react-textarea-autosize';

// eslint-disable-next-line operator-linebreak
const sideBtnStyle =
  'rounded-full flex justify-center items-center h-full text-dark-900/50 cursor-pointer';

const SendMessageInput = () => {
  const router = useRouter();
  const { randomId, refresh } = useRandomId();
  const [message, setMessage] = useState('');
  const { getUserInfo } = useConversations();
  const { addChat, replaceChat } = useChats();
  const { session } = useSession();

  const { mutate } = useMutation(sendMessage, {
    onSuccess: (data) => {
      replaceChat(randomId, data.data.data);
    },
  });

  const { user: receiverUser } = getUserInfo(router.query.id as string);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const trimmedMsg = message.trim();

      if (!receiverUser?._id || !trimmedMsg || !session?.user?._id) return;

      addChat({
        _id: randomId,
        senderId: session?.user?._id,
        message: trimmedMsg,
      });
      setTimeout(() => {
        setMessage('');
      });
      refresh();
      scrollChatScreenToBottom();

      mutate({
        message: trimmedMsg,
        sendTo: receiverUser?._id,
      });
    },
    [
      addChat,
      message,
      mutate,
      randomId,
      receiverUser?._id,
      refresh,
      session?.user?._id,
    ],
  );

  useEffect(() => {
    hotkeys.filter = () => {
      return true;
    };
    hotkeys(HOT_KEYS, () => {
      // handleSubmit();
      console.log('first');
      return false;
    });
  }, [handleSubmit]);

  return (
    <form
      className="shrink-0 flex gap-1 items-end pb-3.5 pt-2 px-3.5"
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
          id="message_input"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
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
