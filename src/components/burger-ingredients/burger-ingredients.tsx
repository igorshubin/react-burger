import React, {FC, useEffect, useRef, useState} from 'react';
import {shallowEqual} from 'react-redux';
import s from './styles.module.css';
import clsx from 'clsx';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {TYPE_BUN, TYPES} from '../../utils/constants';
import Ingredient from './parts/ingredient';
import {IngredientItemProps} from '../../utils/props';
import {getOrderCounts} from '../../utils/order';
import {popupShow} from '../../services/redux/popup-slice';
import {useAppDispatch, useAppSelector} from '../../hooks';

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const {apiStore, orderStore} = useAppSelector(
    state => ({
      apiStore: state.server.data,
      orderStore: state.order,
    }),
    shallowEqual
  );

  const [activeTab, setActiveTab] = useState<string>(TYPE_BUN);
  const [counts, setCounts] = useState<any>({});

  const refs = useRef<any>({});

  useEffect(() => setCounts(getOrderCounts(orderStore)), [orderStore]);

  const showModal = (item:IngredientItemProps) => {
    dispatch(popupShow({
      data: item,
      title: 'Детали ингредиента',
    }));
  }

  // activate tab by nearest content, use getBoundingClientRect
  const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
    const parentTop = e.currentTarget.getBoundingClientRect().top;

    Object.entries(TYPES).map(([id, name]) => {
      const childTop = parseInt(refs.current[id].getBoundingClientRect().top);
      const childTopFix = childTop - parentTop;

      if (childTopFix < 50 && childTopFix > -60) {
        setActiveTab(id);
      }

      return null;
    });
  };

  const handleTabClick = (value:string) => {
    setActiveTab(value);
    refs.current[value].scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  };

  return(
    <section className={clsx(s['bi'], 'pt-10')}>

      <div className={clsx(s['bi--title'], 'text', 'text_type_main-large', 'mb-5')}>
        Соберите бургер
      </div>

      {/* TABS */}
      <nav className={clsx(s['bi--tabs'], 'tabs-mobile')}>
        {
          Object.entries(TYPES).map(([id, name]) => {
            return (
              <Tab key={id} active={activeTab === id} value={id} onClick={handleTabClick}>
                {name}
              </Tab>
            )
          })
        }
      </nav>

      {/* TITLES & LISTS */}
      <div onScroll={handleScroll} className={clsx(s['bi--root'], 'mt-10')}>
        {
          Object.entries(TYPES).map(([id, name]) => {
            const list = apiStore.filter((i:IngredientItemProps) => i.type === id);

            return (
              <div key={id} ref={el => refs.current[id] = el} className={s['bi--content']}>
                <div className={clsx(s['bi--content-title'], 'text', 'text_type_main-medium', 'mb-6')}>
                  {name}
                </div>

                {list.length? (
                  <div className={clsx(s['bi--content-list'], 'pl-4', 'pr-4', 'mb-10')}>
                    {
                      list.map((item:IngredientItemProps) =>
                        <Ingredient
                          key={item._id}
                          count={counts[item._id] ?? 0}
                          data={item}
                          onClick={() => showModal(item)}
                        />)
                    }
                  </div>
                ) : (
                  <div className={clsx(s['bi--content-empty'], 'mb-6')}>
                    Не найдено ингредиентов.
                  </div>
                )}
              </div>
            )
          })
        }
      </div>
    </section>
  );
}

export default BurgerIngredients;
