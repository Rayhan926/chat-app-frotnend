import useConversations from '@hooks/useConversations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiChevronLeft } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';

const Header = () => {
  const router = useRouter();
  const { getUserInfo } = useConversations();

  const { user } = getUserInfo(router.query.id as string);

  return (
    <div className="flex items-center __px shrink-0 py-3 gap-2 border-b border-dark-100">
      {/** Go back --Start-- */}
      <button
        onClick={() => router.back()}
        className="w-9 h-9 rounded-full overflow-hidden flex justify-center items-center -ml-3 hover:bg-dark-100 text-primary"
      >
        <FiChevronLeft size={20} />
      </button>
      {/** Go back --End-- */}

      {/** User Info --Start-- */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="w-9 h-9 rounded-full bg-dark-100 relative overflow-hidden">
            <Image
              alt={user.name}
              src={user?.avatar || '/images/avatar.png'}
              layout="fill"
            />
          </div>
        ) : (
          <Skeleton circle width={36} height={36} />
        )}
        <div>
          {user ? (
            <>
              <h3 className="text-sm font-semibold text-dark-900">
                {user?.name}
              </h3>
              <p className="text-[11px] text-green-600 capitalize">
                {user?.status}
              </p>
            </>
          ) : (
            <>
              <Skeleton width={100} height={14} />
              <Skeleton width={38} height={11} className="mt-1.5" />
            </>
          )}
        </div>
      </div>
      {/** User Info --End-- */}
    </div>
  );
};

export default Header;
