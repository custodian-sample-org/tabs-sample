import React, { ReactNode } from 'react';
import cx from 'clsx';

const DEFAULT_CLASS = 'react-tabs__tab-panel';

interface TabPanelProps {
  children?: ReactNode;
  className?: string | string[] | object;
  forceRender?: boolean;
  id?: string;
  selected?: boolean;
  selectedClassName?: string;
}

const defaultProps: Partial<TabPanelProps> = {
  className: DEFAULT_CLASS,
  forceRender: false,
  selectedClassName: `${DEFAULT_CLASS}--selected`,
};

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const {
    children,
    className,
    forceRender,
    id,
    selected,
    selectedClassName,
    ...attributes
  } = {
    ...defaultProps,
    ...props,
  };

  return (
    <div
      {...attributes}
      className={cx(className, {
        [selectedClassName!]: selected,
      })}
      role="tabpanel"
      id={`panel${id}`}
      aria-labelledby={`tab${id}`}
    >
      {forceRender || selected ? children : null}
    </div>
  );
};

// @ts-expect-error This special property is used internally by react-tabs
TabPanel.tabsRole = 'TabPanel';

export default TabPanel;
