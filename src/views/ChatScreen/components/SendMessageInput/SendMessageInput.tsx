import { sendMessage } from '@client/mutations';
import { HOT_KEYS } from '@config/constants';
import useChats from '@hooks/useChats';
import useConversations from '@hooks/useConversations';
import useDropFiles from '@hooks/useDropFiles';
import useMessageInput from '@hooks/useMessageInput';
import useRandomId from '@hooks/useRandomId';
import useSession from '@hooks/useSession';
import useToast from '@hooks/useToast';
import { getErrorMsg, scrollChatScreenToBottom } from '@utils';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { IoMdSend } from 'react-icons/io';
import { useMutation } from 'react-query';
import TextareaAutosize from 'react-textarea-autosize';
import AttachmentsPicker from './components/AttachmentsPicker';
import AttachmentsPreview from './components/AttachmentsPreview';
import EmojiPicker from './components/EmojiPicker';

const SendMessageInput = () => {
  const router = useRouter();
  const { randomId, refresh } = useRandomId();
  const { message, setFieldValue } = useMessageInput();
  const { getUserInfo } = useConversations();
  const { files, setFiles } = useDropFiles();
  const { addChat, replaceChat, updateChat } = useChats();
  const { session } = useSession();
  const { setToast } = useToast();

  const { user: receiverUser } = getUserInfo(router.query.id as string);

  // send message to the server mutation
  const { mutate } = useMutation(sendMessage, {
    onSuccess: (data) => {
      replaceChat(randomId, data.data.data);
    },
    onError: (err) => {
      setToast({ message: getErrorMsg(err) });
      updateChat(randomId, { status: 'error' });
    },
  });

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();

      const trimmedMsg = message.trim();
      const hasMsgOrFiles = trimmedMsg || files.length > 0;

      if (!receiverUser?._id || !hasMsgOrFiles || !session?.user?._id) return;

      addChat({
        _id: randomId,
        senderId: session?.user?._id,
        message: trimmedMsg,
      });
      setFiles([]);
      setTimeout(() => {
        setFieldValue('message', '');
      });
      refresh();
      scrollChatScreenToBottom();

      const formData = new FormData();
      formData.append('message', trimmedMsg);
      formData.append('sendTo', receiverUser?._id);

      if (files.length > 0) {
        for (let x = 0; x < files.length; x += 1) {
          formData.append('attachments', files[x]);
        }
      }
      mutate(formData as any);
    },
    [
      files,
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
    <div className="shrink-0 pb-3.5 pt-2 px-3.5">
      <AttachmentsPreview />
      <form className="flex gap-1 items-end" onSubmit={handleSubmit}>
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
    </div>
  );
};

export default SendMessageInput;
