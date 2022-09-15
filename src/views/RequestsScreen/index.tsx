import HomepageLayout from '@layouts/HomepageLayout';
import RequestTabs from '@views/RequestsScreen/components/RequestTabs';
import FriendRequestsTab from './components/FriendRequestsTab';
import SentFriendRequestsTab from './components/SentFriendRequestsTab';

const RequestsScreen = () => {
  return (
    <HomepageLayout contentWrapperClass="!pt-0">
      <RequestTabs
        tabs={[
          {
            title: 'Friend Requests',
            body: <FriendRequestsTab />,
          },
          {
            title: 'Sent Requests',
            body: <SentFriendRequestsTab />,
          },
        ]}
      />
    </HomepageLayout>
  );
};

export default RequestsScreen;
