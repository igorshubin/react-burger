import React, {FC} from 'react';
import {AppContentProps} from '../../utils/props';
import s from './styles.module.css';
import clsx from 'clsx';

const AppContent: FC<AppContentProps> = ({children, layout = 'default', testId = ''}) => {
  return(
    <main data-testid={testId && `page-${testId}`} className={clsx(s['app-content'], s[`app-content_${layout}`])}>
      {children}
    </main>
  );
}

export default AppContent;
