import AddFriendFloatButton from '@components/AddFriendFloatButton';
import ChatBox from '@components/ChatBox';
import Header from '@views/HomeScreen/components/Header';

const HomeScreen = () => (
  <div className="h-full flex flex-col relative">
    <Header />
    <div className="grow overflow-y-auto scrollbar-none py-2.5">
      {[...new Array(20).keys()].map((e) => (
        <ChatBox key={e} />
      ))}
    </div>
    <AddFriendFloatButton />
  </div>
);

export default HomeScreen;
