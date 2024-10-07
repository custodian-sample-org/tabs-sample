import type { ReactNode } from 'react';

export type TabNode = ReactNode & {
  type: {
    tabsRole: 'Tab' | 'TabList' | 'TabPanel';
  };
};

function makeTypeChecker(tabsRole: string) {
  return (element: ReactNode): element is TabNode => {
    // @ts-expect-error We skip typing on element.type because this is meant as a type guard
    return !!element.type && element.type.tabsRole === tabsRole;
  };
}

export const isTab = makeTypeChecker('Tab');
export const isTabList = makeTypeChecker('TabList');
export const isTabPanel = makeTypeChecker('TabPanel');
