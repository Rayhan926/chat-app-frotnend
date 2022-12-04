import HomeScreen from '@views/HomeScreen';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>Inbox</title>
      </Head>
      <HomeScreen />
    </>
  );
};

export default Home;

/**
 *Fixes

 Send friend request focus issue.
 Chat header last see text
 Chat auto scroll to bottom not working on mobile
 Auto scroll to bottom on focus send message textarea on mobile
 *
 */
