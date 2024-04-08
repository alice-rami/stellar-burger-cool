import { useState, useEffect, MutableRefObject } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
import { TabId, TabsData } from './config';
import { Tab } from '../../ui/tab/component';

export type Ref = Record<string, HTMLElement>;

interface TabsMobileProps {
  visibleGroup: TabId;
  refs: MutableRefObject<Ref>;
  tabsData: TabsData[];
  className?: string;
}

export const TabsIngredients = ({
  tabsData,
  visibleGroup,
  refs,
  className,
}: TabsMobileProps) => {
  const [current, setCurrent] = useState('one');

  useEffect(() => {
    setCurrent(visibleGroup);
  }, [visibleGroup]);

  const scrollToGroup = (tabClicked: TabId) => {
    const targetGroup = refs.current[tabClicked];
    targetGroup.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ul className={classNames(styles.container, className)}>
      {tabsData.map((item, index) => {
        return (
          <li key={index} className={classNames(styles.tabContainer)}>
            <Tab
              current={current}
              value={item.value}
              onClick={() => {
                setCurrent(item.value);
                scrollToGroup(item.value);
              }}
            >
              {item.title}
            </Tab>
          </li>
        );
      })}
    </ul>
  );
};
