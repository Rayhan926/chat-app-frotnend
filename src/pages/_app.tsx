import ChatBodyWrapper from '@components/ChatBodyWrapper';
import ToastContainer from '@components/ToastContainer';
import { AuthProvider } from '@hooks/useSession';
import useTheme from '@hooks/useTheme';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AnimateSharedLayout } from 'framer-motion';
import type { AppProps } from 'next/app';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      select: (res: any) => res.data.data,
    },
    mutations: {
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { isDarkTheme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <AnimateSharedLayout>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <SkeletonTheme
              baseColor={isDarkTheme ? '#333' : '#ddd'}
              highlightColor={isDarkTheme ? '#555' : '#f1f1fe'}
              borderRadius={2}
            >
              <ChatBodyWrapper>
                <Component {...pageProps} />
                <ToastContainer />
              </ChatBodyWrapper>
            </SkeletonTheme>
          </AuthProvider>
        </GoogleOAuthProvider>
      </AnimateSharedLayout>
    </QueryClientProvider>
  );
}

export default MyApp;
