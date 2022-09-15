import { accpetFriendRequest } from '@client/mutations';
import CircularProgress from '@components/CircularProgress';
import useFriendRequests from '@hooks/useFriendRequests';
import useToast from '@hooks/useToast';
import { ChatBoxProps } from '@types';
import { cx } from '@utils';
import Image from 'next/image';
import React from 'react';
import { useMutation } from 'react-query';

type BtnProps = React.ComponentProps<'button'> & { isLoading?: boolean };
const Btn = React.forwardRef<HTMLButtonElement, BtnProps>(
  ({ className, children, isLoading = false, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        disabled={disabled || isLoading}
        className={cx(
          'px-3 py-1 rounded bg-primary text-white outline-none text-xs hover:scale-105 duration-100 overflow-hidden relative',
          className,
        )}
      >
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <CircularProgress size={15} />
          </div>
        )}
        <span
          className={cx(
            isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100',
          )}
        >
          {children}
        </span>
      </button>
    );
  },
);

Btn.displayName = 'Btn';

const FriendRequest = ({ avatar, _id, name }: ChatBoxProps) => {
  const { setToast } = useToast();
  const { removeFromList } = useFriendRequests();

  // accpet request
  const accept = useMutation(() => accpetFriendRequest(_id), {
    onSuccess: (res) => {
      removeFromList(_id);
      setToast({ message: res.data.message });
    },
    onError: (err: any) => setToast({ message: err.response.data.message }),
  });

  return (
    <div className="flex items-center __px py-2.5 gap-4">
      <div className="w-12 h-12 rounded-full bg-dark-100 shrink-0 overflow-hidden relative">
        <Image src={avatar || '/images/avatar.png'} alt={name} layout="fill" />
      </div>
      <div>
        <h3 className="font-semibold text-base text-dark-900 line-clamp-1">
          {name}
        </h3>
      </div>

      <div className="flex gap-2 ml-auto shrink-0">
        <Btn className="bg-dark-100 text-dark-900">Cancel</Btn>
        <Btn isLoading={accept.isLoading} onClick={() => accept.mutate()}>
          Accept
        </Btn>
      </div>
    </div>
  );
};

export default FriendRequest;
