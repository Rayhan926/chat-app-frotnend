import { getConversations } from '@client/queries';
import AddFriendFloatButton from '@components/AddFriendFloatButton';
import ChatBox from '@components/ChatBox';
import Header from '@views/HomeScreen/components/Header';
import { useQuery } from 'react-query';

const HomeScreen = () => {
  const { data, isLoading } = useQuery('get-conversations', getConversations);
  console.log(data);
  return (
    <div className="h-full flex flex-col relative">
      <Header />
      <div className="grow overflow-y-auto scrollbar-none py-2.5">
        {isLoading
          ? 'Loading..'
          : data &&
            (data as any).map((e: any, i: number) => (
              <ChatBox {...e} key={i} />
            ))}
      </div>
      <AddFriendFloatButton />
    </div>
  );
};

export default HomeScreen;
