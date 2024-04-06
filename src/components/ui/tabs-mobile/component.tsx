import { useState, useEffect, MutableRefObject } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
import { textDefault, textS } from '../../../utils/constants-kit-styles';
import { TabId, TabsData } from './config';
import { useScreenSize } from '../../../device-context/hook';

export type Ref = Record<string, HTMLElement>;

interface TabsMobileProps {
  visibleGroup: TabId;
  refs: MutableRefObject<Ref>;
  tabsData: TabsData[];
  className?: string;
}

export const TabsMobile = ({
  tabsData,
  visibleGroup,
  refs,
  className,
}: TabsMobileProps) => {
  const [current, setCurrent] = useState('one');
  const { isMobile } = useScreenSize();

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
          <li
            key={index}
            value={item.value}
            onClick={() => {
              setCurrent(item.value);
              scrollToGroup(item.value);
            }}
            className={classNames(
              isMobile ? textS : textDefault,
              'pt-4 pb-4',
              styles.tab,
              {
                [styles.active]: current === item.value,
              }
            )}
          >
            {item.title}
          </li>
        );
      })}
    </ul>
  );
};
