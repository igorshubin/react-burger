import React, {FC, useState} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {TYPEDEFAULT, TYPES} from '../../utils/constants';
import Ingredient from './parts/ingredient';
import {DataProps, IngredientItemProps} from '../../utils/props';
import IngredientDetails from '../ingredient-details';
import Modal from '../modal';

interface BurgerIngredientsProps {
  apiData: DataProps;
}

const BurgerIngredients: FC<BurgerIngredientsProps> = ({apiData}) => {
  const [activeTab, setActiveTab] = useState<string>(TYPEDEFAULT);
  const [modalData, setModalData] = useState<IngredientItemProps|null>(null);

  const handleTabClick = (value:string) => setActiveTab(value);

  return(
    <section className={clsx(s['bi'], 'pt-10')}>

      <div className={clsx(s['bi--title'], 'text', 'text_type_main-large', 'mb-5')}>
        Соберите бургер
      </div>

      {/* TABS */}
      <nav className={clsx(s['bi--tabs'], 'mb-10', 'tabs-mobile')}>
        {
          TYPES.map((item, k) => {
            return (
              <Tab key={k} active={activeTab === item.id} value={item.id} onClick={handleTabClick}>
                {item.name}
              </Tab>
            )
          })
        }
      </nav>

      {/* TITLES & LISTS */}
      <div className={clsx(s['bi--root'])}>
        {
          TYPES.map((type, key) => {
            const list = apiData.data.filter((i:IngredientItemProps) => i.type === type.id);

            return (
              <div key={key} className={clsx(s['bi--content'], {[s['bi_hidden']]: type.id !== activeTab})}>
                <div className={clsx(s['bi--content-title'], 'text', 'text_type_main-medium', 'mb-6')}>
                  {type.name}
                </div>

                {list.length? (
                  <div className={clsx(s['bi--content-list'], 'pl-4', 'pr-4', 'mb-10')}>
                    {
                      list.map((item:IngredientItemProps) =>
                        <Ingredient
                          key={item._id}
                          data={item}
                          onClick={() => setModalData(item)}
                        />)
                    }
                  </div>
                ) : (
                  <div className={s['bi--content-empty']}>
                    Не найдено ингредиентов.
                  </div>
                )}
              </div>
            )
          })
        }
      </div>

      {/* INGREDIENT MODAL */}
      {modalData &&
        <Modal modalClose={() => setModalData(null)} title={'Детали ингредиента'}>
          <IngredientDetails data={modalData} />
        </Modal>
      }
    </section>
  );
}

export default BurgerIngredients;
