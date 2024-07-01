import React, {FC, useEffect, useRef, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import s from './styles.module.css';
import clsx from 'clsx';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {TYPEDEFAULT, TYPES} from '../../utils/constants';
import Ingredient from './parts/ingredient';
import {IngredientItemProps} from '../../utils/props';
import {ACTIONS, DataProps} from '../../services/redux/store';
import IngredientDetails from '../ingredient-details';
import Modal from '../modal';
import {getOrderCounts} from '../../utils/utils';

interface BurgerIngredientsProps {
}

const BurgerIngredients: FC<BurgerIngredientsProps> = () => {
  const {apiData, orderData, popupData} = useSelector(
    (state:DataProps) => ({
      apiData: state.server.data,
      orderData: state.order,
      popupData: state.popup,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<string>(TYPEDEFAULT);
  const [counts, setCounts] = useState<any>({});

  const refs = useRef<any>({});

  useEffect(() => setCounts(getOrderCounts(orderData)), [orderData]);

  const showModal = (item:IngredientItemProps) => {
    dispatch({type: ACTIONS.POPUP_SHOW,
      payload: {
        data: item,
        title: 'Детали ингредиента',
    }})
  }

  /**
   * TODO:
   * activate tab by nearest content (refs.current[value]), use getBoundingClientRect
   * refactor by docs: https://app.pachca.com/chats/9643197?message=267496633
   * research: https://www.youtube.com/watch?v=ldgnmiPIftw&list=PL6DxKON1uLOHsBCJ_vVuvRsW84VnqmPp6&index=3
   */
  const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
    const parentTop = e.currentTarget.getBoundingClientRect().top;
    console.clear();

    Object.entries(TYPES).map(([id, name]) => {
      const childTop = parseInt(refs.current[id].getBoundingClientRect().top);
      console.log(id, childTop);

      if (childTop < parentTop) {
        console.log(id.toUpperCase());
      }
    })

/*    console.log({
      event: e,
      target: e.target,
      currentTarget: e.currentTarget,
      scrollTop: e.currentTarget.scrollTop,
    });*/
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
            const list = apiData.filter((i:IngredientItemProps) => i.type === id);

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

      {/* INGREDIENT MODAL */}
      {popupData.data &&
        <Modal>
          <IngredientDetails data={popupData.data} />
        </Modal>
      }
    </section>
  );
}

export default BurgerIngredients;
