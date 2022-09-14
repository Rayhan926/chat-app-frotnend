import { TabButtonProps } from '@types';
import { cx } from '@utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

const TabButton = ({ activeIcon, icon, path }: TabButtonProps) => {
  const router = useRouter();

  const isActive = router.pathname === path;
  return (
    <Link href={path}>
      <a
        className={cx(
          'p-3 rounded-lg cursor-pointer hover:bg-primary/5',
          isActive ? 'text-primary' : 'hover:text-primary text-dark-700/70',
        )}
      >
        {isActive ? activeIcon : icon}
      </a>
    </Link>
  );
};

export default TabButton;
