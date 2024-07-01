import {FC, useEffect, useCallback} from 'react';
import {createPortal} from 'react-dom';
import s from './styles.module.css';
import {ModalProps} from '../../utils/props';
import clsx from 'clsx';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import {ACTIONS, DataProps} from '../../services/redux/store';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

const Modal: FC<ModalProps> = ({children}) => {
  const dispatch = useDispatch();
  const {popupShow, popupTitle} = useSelector(
    (state:DataProps) => ({
      popupShow: state.popup.show,
      popupTitle: state.popup.title,
    }),
    shallowEqual
  );

  const modalClose = useCallback(() => dispatch({type: ACTIONS.POPUP_HIDE}), [dispatch]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') modalClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [modalClose]);

  return (
    <>
      {
        popupShow &&
        createPortal(
          <>
            <div className={clsx(s['modal'], 'p-10')}>
              <div className={clsx(s['modal--header'], 'text', 'text_type_main-large')}>
                <span>
                  {popupTitle}
                </span>
                <CloseIcon type={'primary'} onClick={modalClose}/>
              </div>

              <div className={s['modal--body']}>
                {children}
              </div>
            </div>

            <ModalOverlay modalClose={modalClose}/>
          </>,
          document.getElementById('react-modals') as HTMLElement
        )
      }
    </>
  );
}

export default Modal;
