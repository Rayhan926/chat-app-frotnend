import { HomepageLayoutProps } from '@types';
import { cx } from '@utils';
import Footer from '@views/HomeScreen/components/Footer';
import Header from '@views/HomeScreen/components/Header';

const HomepageLayout = ({
  children,
  contentWrapperClass,
}: HomepageLayoutProps) => {
  return (
    <div className="h-full flex flex-col relative">
      <Header />
      <div
        className={cx(
          'grow overflow-y-auto scrollbar-none pb-2.5',
          contentWrapperClass,
        )}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default HomepageLayout;
