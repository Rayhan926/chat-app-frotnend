import ChatBodyWrapper from '@components/ChatBodyWrapper';
import { AuthProvider } from '@hooks/useSession';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <AuthProvider>
        <ChatBodyWrapper>
          <Component {...pageProps} />
        </ChatBodyWrapper>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
