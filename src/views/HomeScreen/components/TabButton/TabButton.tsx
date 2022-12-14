import { TabButtonProps } from '@types';
import { cx } from '@utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

const TabButton = ({
  activeIcon,
  icon,
  path,
  className,
  extraChildren,
}: TabButtonProps) => {
  const router = useRouter();

  const isActive = router.pathname === path;
  return (
    <Link href={path}>
      <a
        className={cx(
          'px-3 py-4 pb-5 grow flex justify-center rounded-lg cursor-pointer hover:bg-primary/5',
          isActive
            ? 'text-primary'
            : 'hover:text-primary text-dark-700/70 dark:text-dark-mode-200',
        )}
      >
        <span className={cx(className)}>
          {isActive ? activeIcon : icon}
          {extraChildren}
        </span>
      </a>
    </Link>
  );
};

export default TabButton;
