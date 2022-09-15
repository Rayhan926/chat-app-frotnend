import CircularProgress from '@components/CircularProgress';
import useSession from '@hooks/useSession';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';

const LoginScreen = () => {
  const { mutateGoogleLogin: googleLogin } = useSession();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleLogin?.mutate(tokenResponse.access_token);
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
          className="w-full px-5 py-3 rounded-full outline-none bg-white text-dark-900 mt-7 relative overflow-hidden"
          onClick={() => login()}
          disabled={googleLogin?.isLoading}
        >
          {/** Loader --Start-- */}
          {googleLogin?.isLoading && (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-primary bg-white z-10">
              <CircularProgress size={25} />
            </div>
          )}
          {/** Loader --End-- */}
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
