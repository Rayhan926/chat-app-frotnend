import useConversations from '@hooks/useConversations';
import ChatScreen from '@views/ChatScreen';
import Head from 'next/head';
import { useRouter } from 'next/router';

const SingleChat = () => {
  const router = useRouter();
  const { getUserInfo } = useConversations();
  const user = getUserInfo(router.query.id as string);

  return (
    <>
      <Head>
        <title>{user?.name || 'Loading..'}</title>
      </Head>
      <ChatScreen />
    </>
  );
};
export default SingleChat;
