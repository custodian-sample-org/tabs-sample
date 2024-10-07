import { Children, cloneElement, type ReactNode } from 'react';
import { isTabPanel, isTab, isTabList, type TabNode } from './elementTypes';

function isTabChild(child: ReactNode) {
  return isTab(child) || isTabList(child) || isTabPanel(child);
}

export function deepMap(
  children: ReactNode[],
  callback: (child: TabNode) => ReactNode,
): ReactNode {
  return Children.map(children, (child) => {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (child === null || !child) return null;

    if (isTabChild(child)) {
      return callback(child);
    }

    if (
      typeof child === 'object' &&
      'props' in child &&
      child.props &&
      child.props.children &&
      typeof child.props.children === 'object'
    ) {
      // Clone the child that has children and map them too
      return cloneElement(child, {
        ...child.props,
        children: deepMap(child.props.children, callback),
      });
    }

    return child;
  });
}

export function deepForEach(
  children: ReactNode[],
  callback: (child: TabNode) => void,
) {
  return Children.forEach(children, (child) => {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (child === null) return;

    if (isTab(child) || isTabPanel(child)) {
      callback(child);
    } else if (
      typeof child === 'object' &&
      child &&
      'props' in child &&
      child.props &&
      child.props.children &&
      typeof child.props.children === 'object'
    ) {
      if (isTabList(child)) callback(child);
      deepForEach(child.props.children, callback);
    }
  });
}
