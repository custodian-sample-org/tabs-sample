import { type ReactNode } from 'react';
import cx from 'clsx';

interface TabListProps {
  children: ReactNode;
  className?: string | string[] | object;
}

const defaultProps = {
  className: 'react-tabs__tab-list',
};


const TabList = (props: TabListProps) => {
  const {
    children,
    className,
    ...attributes
  } = {
    ...defaultProps,
    ...props,
  };

  return (
    <ul {...attributes} className={cx(className)} role="tablist">
      {children}
    </ul>
  );
};

TabList.tabsRole = 'TabList';

export default TabList;
