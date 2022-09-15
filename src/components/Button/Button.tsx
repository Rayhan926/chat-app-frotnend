import CircularProgress from '@components/CircularProgress';
import { cx } from '@utils';
import React from 'react';

type ButtonProps = React.ComponentProps<'button'> & { isLoading?: boolean };
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading = false, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        disabled={disabled || isLoading}
        className={cx(
          'px-3 py-1 rounded bg-primary text-white outline-none text-xs hover:scale-105 duration-100 overflow-hidden relative',
          className,
        )}
      >
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <CircularProgress size={15} />
          </div>
        )}
        <span
          className={cx(
            isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100',
          )}
        >
          {children}
        </span>
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
