import ChatBodyPortal from '@components/ChatBodyPortal';
import { DrawerProps } from '@types';
import { cx } from '@utils';
import { useRef } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useClickAway } from 'react-use';

const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  const contentRef = useRef<HTMLDivElement>(null!);
  useClickAway(contentRef, onClose);
  return (
    <ChatBodyPortal>
      <div
        className={cx(
          'absolute top-0 left-0 w-full h-full bg-dark-900/40 z-[999999] flex items-end duration-300',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none delay-100',
        )}
      >
        {/** Content Wrapper --Start-- */}
        <div
          ref={contentRef}
          className={cx(
            'w-full min-h-[10%] max-h-full bg-primary rounded-t-[25px] duration-300 relative',
            isOpen ? 'translate-y-0 delay-100' : 'translate-y-full',
          )}
        >
          {/** Close Icon --Start-- */}
          <button
            onClick={onClose}
            className="absolute top-0 -translate-y-1/2 right-5 cursor-pointer w-12 h-12 rounded-md bg-white flex justify-center items-center text-primary group active:scale-110 duration-150"
          >
            <IoCloseSharp
              size={23}
              className="group-hover:scale-110 duration-150"
            />
          </button>
          {/** Close Icon --End-- */}

          {children}
        </div>
        {/** Content Wrapper --End-- */}
      </div>
    </ChatBodyPortal>
  );
};

export default Drawer;