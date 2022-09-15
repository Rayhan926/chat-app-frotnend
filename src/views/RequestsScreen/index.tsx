import HomepageLayout from '@layouts/HomepageLayout';
import RequestTabs from '@views/RequestsScreen/components/RequestTabs';
import FriendRequestsTab from './components/FriendRequestsTab';

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
            body: 'Sent Requests',
          },
        ]}
      />
    </HomepageLayout>
  );
};

export default RequestsScreen;
