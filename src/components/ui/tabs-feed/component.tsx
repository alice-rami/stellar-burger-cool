import { useState } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
import { Tab } from '../tab/component';
import { feedTabsData } from './config';

interface TabsFeedProps {
  setElement: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

export const TabsFeed = ({ setElement, className }: TabsFeedProps) => {
  const [current, setCurrent] = useState('one');
  // const navigate = useNavigate();

  return (
    <ul className={classNames(styles.container, className)}>
      {feedTabsData.map(({ value, title, groupId }, index) => {
        return (
          <li key={index} className={classNames(styles.tabContainer)}>
            <Tab
              current={current}
              onClick={() => {
                setCurrent(value);
                setElement(groupId);
              }}
              value={value}
            >
              {title}
            </Tab>
          </li>
        );
      })}
    </ul>
  );
};
