import { ListProps } from '@types';
import { cx } from '@utils';
import { motion } from 'framer-motion';

const List = ({
  title,
  subtitle,
  icon,
  value,
  className,
  ...props
}: ListProps) => {
  return (
    <motion.div
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        damping: 0,
      }}
      className={cx(
        'flex gap-2.5 items-center __px py-3 border-b border-dark-100 dark:border-dark-mode-800 last:border-b-0 text-dark-900/60 dark:text-white/60 text-sm',
        className,
      )}
      {...(props as any)}
    >
      <div className="shrink-0">{icon}</div>
      <div className="shrink-0 grow">
        <p className="line-clamp-1">{title}</p>
        {subtitle && (
          <p className="line-clamp-1 text-xs text-dark-700 dark:text-dark-mode-300">
            {subtitle}
          </p>
        )}
      </div>
      {value && (
        <p className="line-clamp-1 text-dark-900 dark:text-white font-medium">
          {value}
        </p>
      )}
    </motion.div>
  );
};

export default List;
