import { useOpenFriendRequestDrawer } from '@atoms';
import { sendFriendRequest } from '@client/mutations';
import Drawer from '@components/Drawer';
import useSentFriendRequests from '@hooks/useSentFriendRequests';
import useToast from '@hooks/useToast';
import { getErrorMsg } from '@utils';
import React, { useRef, useState } from 'react';
import { useMutation } from 'react-query';

const SendFriendRequestDrawer = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [isOpen, setIsOpen] = useOpenFriendRequestDrawer();
  const { addToList } = useSentFriendRequests();
  const { setToast } = useToast();

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading } = useMutation(sendFriendRequest, {
    onSuccess: (res) => {
      addToList(res.data.data);
      setToast({
        type: 'success',
        message: res.data.message,
      });
    },
    onError: (err: any) =>
      setToast({
        type: 'error',
        message: getErrorMsg(err),
      }),
    onSettled: () => {
      setIsOpen(false);
      setUsernameOrEmail('');
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameOrEmail.trim()) return;

    mutate(usernameOrEmail);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => inputRef.current?.focus()}
    >
      <div className="__px py-5 sm:py-6">
        <h3 className="text-2xl text-white font-semibold">
          Connect with Friends
        </h3>

        <form className="mt-6 space-y-3" onSubmit={submitHandler}>
          <input
            type="text"
            ref={inputRef}
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-md outline-none bg-white text-dark-900"
            placeholder="Find by username, email"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-5 py-3 rounded-md outline-none bg-white text-primary hover:bg-white/90"
          >
            {isLoading ? 'Sending request..' : 'Send'}
          </button>
        </form>
      </div>
    </Drawer>
  );
};

export default SendFriendRequestDrawer;
