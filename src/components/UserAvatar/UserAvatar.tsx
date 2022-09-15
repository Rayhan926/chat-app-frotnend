/* eslint-disable no-underscore-dangle */
import useSession from '@hooks/useSession';
import Image from 'next/image';

const UserAvatar = () => {
  const { session, logout } = useSession();
  const user = session?.user;

  return (
    <div className="flex items-center gap-2">
      <div className="text-xs">
        <p>
          {user?.username || ''} {user?.name}
        </p>
        <p>{user?._id}</p>
      </div>
      <div
        className="w-10 h-10 rounded-full bg-dark-100 relative overflow-hidden cursor-pointer"
        onClick={logout}
      >
        <Image
          layout="fill"
          src={user?.avatar || '/images/avatar.png'}
          alt={user?.name || ''}
        />
      </div>
    </div>
  );
};

export default UserAvatar;
