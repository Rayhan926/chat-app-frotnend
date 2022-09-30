import client from '@client';
import { HOT_KEYS } from '@config/constants';
import useChats from '@hooks/useChats';
import useConversations from '@hooks/useConversations';
import useDropFiles from '@hooks/useDropFiles';
import useMessageInput from '@hooks/useMessageInput';
import useRandomId from '@hooks/useRandomId';
import useSession from '@hooks/useSession';
import useToast from '@hooks/useToast';
import useTyping from '@hooks/useTyping';
import useUploadOnProgress from '@hooks/useUploadOnProgress';
import { SendMessageType } from '@types';
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
  const { getUserInfo, updateConversation } = useConversations();
  const { files, setFiles } = useDropFiles();
  const { addChat, replaceChat, updateChat } = useChats();
  const { session } = useSession();
  const { setToast } = useToast();
  const { addProgress } = useUploadOnProgress();
  const { cancelTyping, clearTimeOut } = useTyping();

  const receiverUser = getUserInfo(router.query.id as string);

  const { mutate } = useMutation(
    (sendMessageOptions: SendMessageType) =>
      client.post('/conversations/chat/send', sendMessageOptions, {
        onUploadProgress(progressEvent) {
          const uploadProgress = (
            (progressEvent.loaded / progressEvent.total) *
            100
          ).toFixed(2);

          const toNumber = parseInt(uploadProgress, 10);

          if (toNumber < 1) {
            clearTimeOut();
          }
          // console.log(randomId, toNumber);
          addProgress({
            id: randomId,
            progress: toNumber,
          });
          if (toNumber === 100) {
            setTimeout(() => {
              addProgress({
                id: randomId,
                progress: null,
              });
            }, 500);
          }
        },
      }),
    {
      onSuccess: (data) => {
        const chat = data?.data?.data;
        replaceChat(randomId, chat);
        updateChat(randomId, { uploadProgress: null });
        cancelTyping();
        updateConversation(receiverUser?._id || '', {
          lastMessage: chat,
        });
      },
      onError: (err) => {
        setToast({ message: getErrorMsg(err) });
        updateChat(randomId, { status: 'error' });
      },
    },
  );

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
        attachments: files,
      });
      setFiles([]);
      refresh();
      setTimeout(() => {
        setFieldValue('message', '');
      });
      scrollChatScreenToBottom();

      const formData = new FormData();
      formData.append('message', trimmedMsg);
      formData.append('sendTo', receiverUser?._id);

      if (files.length > 0) {
        for (let x = 0; x < files.length; x += 1) {
          const file = files[x];
          formData.append('attachments', file);
        }

        formData.append(
          'attachmentsMeta',
          JSON.stringify(
            files.map((file) => ({
              width: file.width,
              height: file.height,
            })),
          ),
        );
      }

      mutate(formData as any);
    },
    [
      files,
      setFiles,
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
