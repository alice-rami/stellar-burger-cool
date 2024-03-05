import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './styles.module.css';
import { tabsData } from './config';
import classNames from 'classnames';

interface TabsProps {
  className: string;
}

export const Tabs = ({ className }: TabsProps) => {
  const [current, setCurrent] = useState('one');

  return (
    <div className={classNames(className, styles.container)}>
      {tabsData.map((item, index) => (
        <Tab
          key={index}
          value={item.value}
          active={current === item.value}
          onClick={() => setCurrent(item.value)}
        >
          {item.title}
        </Tab>
      ))}
    </div>
  );
};
