import Skeleton from 'react-loading-skeleton';

const ConversationSkelenton = () => {
  return (
    <div className="__px gap-4 flex py-2.5 items-center">
      <div className="relative">
        <Skeleton width={48} height={48} circle />
        <Skeleton
          width={12}
          height={12}
          circle
          className="absolute bottom-0 right-0 border-2 border-white"
        />
      </div>
      <div>
        <Skeleton width={145} height={15} />
        <Skeleton width={120} height={12} className="mt-2" />
      </div>
      <div className="ml-auto flex flex-col items-end">
        <Skeleton width={50} height={10} />
        <Skeleton width={20} height={20} circle className="mt-1.5" />
      </div>
    </div>
  );
};

export default ConversationSkelenton;
