import React, {FC} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import AppContent from '../../common/app-content';
import ProfileMenu from '../../common/profile-menu';

const ProfileOrders: FC = () => {
  return (
    <AppContent layout={'profile'}>

      <div className={clsx(s['profile'], 'mt-10')}>
        <section className={clsx(s['profile-left'], 'mr-15')}>
          <ProfileMenu />

          <div className={clsx(s['profile-text'], 'text_color_inactive')}>
            В этом разделе вы можете просмотреть свою историю заказов
          </div>
        </section>

        <section className={s['profile-form']}>
          <div className={clsx(s['profile-text'], 'text_color_inactive', 'mt-10')}>
            Страница находится в разработке ...
          </div>
        </section>
      </div>

    </AppContent>
  );
}

export default ProfileOrders;
