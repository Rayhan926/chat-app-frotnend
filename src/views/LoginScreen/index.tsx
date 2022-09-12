import useSession from '@hooks/useSession';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';

const LoginScreen = () => {
  const { session, googleLogin } = useSession();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleLogin(tokenResponse.access_token);
    },
  });
  return (
    <div className="h-full bg-primary relative flex items-end pb-7">
      <div className="__px">
        <h1 className="text-white font-bold text-4xl">
          Let&apos;s Get <br /> Started{' '}
        </h1>
        <p className="text-base text-white/90 mt-3 max-w-[85%]">
          Connect with each other with chatting or calling. Enjoy safe and
          private texting
        </p>
        <button
          className="w-full px-5 py-3 rounded-full outline-none bg-white text-dark-900 mt-7 relative"
          onClick={() => login()}
        >
          <div className="absolute h-full aspect-square rounded-full left-0 top-0 flex items-center justify-center">
            <Image
              src={'/images/google-logo.svg'}
              width={24}
              height={24}
              alt="Google Login"
            />
          </div>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
