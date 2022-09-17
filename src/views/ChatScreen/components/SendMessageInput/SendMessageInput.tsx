import { sendMessage } from '@client/mutations';
import { HOT_KEYS } from '@config/constants';
import useChats from '@hooks/useChats';
import useConversations from '@hooks/useConversations';
import useMessageInput from '@hooks/useMessageInput';
import useRandomId from '@hooks/useRandomId';
import useSession from '@hooks/useSession';
import { scrollChatScreenToBottom } from '@utils';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { IoMdSend } from 'react-icons/io';
import { useMutation } from 'react-query';
import TextareaAutosize from 'react-textarea-autosize';
import AttachmentsPicker from './components/AttachmentsPicker';
import EmojiPicker from './components/EmojiPicker';

const SendMessageInput = () => {
  const router = useRouter();
  const { randomId, refresh } = useRandomId();
  const { message, setFieldValue } = useMessageInput();
  const { getUserInfo } = useConversations();
  const { addChat, replaceChat } = useChats();
  const { session } = useSession();

  const { user: receiverUser } = getUserInfo(router.query.id as string);

  // send message to the server mutation
  const { mutate } = useMutation(sendMessage, {
    onSuccess: (data) => {
      replaceChat(randomId, data.data.data);
    },
  });

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
        setFieldValue('message', '');
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
      setFieldValue,
    ],
  );

  useHotkeys(HOT_KEYS, () => handleSubmit(), {
    enableOnTags: ['TEXTAREA'],
  });

  return (
    <form
      className="shrink-0 flex gap-1 items-end pb-3.5 pt-2 px-3.5"
      onSubmit={handleSubmit}
    >
      {/** Input --Start-- */}
      <div className="grow flex rounded-[25px] items-center bg-dark-100 min-h-11 relative">
        <EmojiPicker />
        <TextareaAutosize
          maxRows={4}
          placeholder="Message"
          value={message}
          id="message_input"
          onChange={(e) => {
            setFieldValue('message', e.target.value);
          }}
          className="w-full resize-none outline-none py-2.5 px-3 text-dark-900 placeholder:text-dark-700 bg-transparent"
        />
        <AttachmentsPicker />
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
