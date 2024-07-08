import React, {FC} from 'react';
import {AppContentProps} from '../../utils/props';
import s from './styles.module.css';
import clsx from 'clsx';

const AppContent: FC<AppContentProps> = ({children, layout = 'default'}) => {
  return(
    <main className={clsx(s['app-content'], s[`app-content_${layout}`])}>
      {children}
    </main>
  );
}

export default AppContent;
