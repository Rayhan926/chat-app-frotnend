import { ListProps } from '@types';
import { cx } from '@utils';
import { motion } from 'framer-motion';

const List = ({ title, icon, value, className, ...props }: ListProps) => {
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
        'flex gap-2.5 items-center __px py-3 border-b border-dark-100 last:border-b-0 text-dark-900/60 text-sm',
        className,
      )}
      {...(props as any)}
    >
      <div className="shrink-0">{icon}</div>
      <p className="line-clamp-1 shrink-0 grow">{title}</p>
      {value && (
        <p className="line-clamp-1 text-dark-900 font-medium">{value}</p>
      )}
    </motion.div>
  );
};

export default List;
