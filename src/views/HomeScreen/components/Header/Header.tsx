import UserAvatar from '@components/UserAvatar';
import { getTabTitle } from '@utils';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const tabTitle = getTabTitle(router.pathname);

  return (
    <header className="__px flex justify-between items-center sm:pt-6 py-4 border-b border-dark-100 dark:border-dark-mode-800 shrink-0">
      <h1 className="font-semibold text-[23px] text-dark-900 dark:text-white">
        {tabTitle}
      </h1>
      <UserAvatar />
    </header>
  );
}
