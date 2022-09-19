import ChatBodyWrapper from '@components/ChatBodyWrapper';
import ToastContainer from '@components/ToastContainer';
import { AuthProvider } from '@hooks/useSession';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <AuthProvider>
          <SkeletonTheme
            baseColor="#ddd"
            highlightColor="#f1f1fe"
            borderRadius={2}
          >
            <ChatBodyWrapper>
              <Component {...pageProps} />
              <ToastContainer />
            </ChatBodyWrapper>
          </SkeletonTheme>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
