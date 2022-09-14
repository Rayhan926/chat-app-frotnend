import Footer from '@views/HomeScreen/components/Footer';
import Header from '@views/HomeScreen/components/Header';
import { ReactNode } from 'react';

const HomepageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col relative">
      <Header />
      <div className="grow overflow-y-auto scrollbar-none py-2.5">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default HomepageLayout;
