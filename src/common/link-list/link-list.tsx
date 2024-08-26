import React, {FC} from 'react';
import s from './styles.module.css';
import {ArrowUpIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';

import {Link} from 'react-router-dom';

const LinkList: FC<{linkBack: string}> = ({linkBack}) =>
    <div className={clsx(s['link-list'], 'mt-10')}>
      <Link to={linkBack} className={'text_type_main-small text_color_inactive'}>
        <span>Список</span>
        <ArrowUpIcon type={'secondary'}/>
      </Link>
    </div>

export default LinkList;
