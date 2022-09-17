import { RequestTabsProps } from '@types';
import { cx } from '@utils';
import { useState } from 'react';

const RequestTabs = ({ tabs }: RequestTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeBody = tabs[activeIndex].body;
  return (
    <div className="h-full flex flex-col">
      {/** Tabs Header --Start-- */}
      <div className="flex">
        {tabs.map((tab, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              type="button"
              className={cx(
                'grow px-6 py-3 relative',
                isActive
                  ? 'text-primary'
                  : 'text-dark-700 hover:bg-primary/5 hover:text-primary',
              )}
            >
              {tab.title}

              {isActive && (
                <span className="w-full h-0.5 bg-primary absolute bottom-0 left-0"></span>
              )}
            </button>
          );
        })}
      </div>
      {/** Tabs Header --End-- */}

      {/** Tabs Body --Start-- */}
      {activeBody}
      {/** Tabs Body --End-- */}
    </div>
  );
};

export default RequestTabs;
