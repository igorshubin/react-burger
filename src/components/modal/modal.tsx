import {FC, useEffect, useCallback, ReactPortal} from 'react';
import {createPortal} from 'react-dom';
import s from './styles.module.css';
import {ModalProps} from '../../utils/props';
import clsx from 'clsx';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import {shallowEqual} from 'react-redux';
import {popupHide} from '../../services/redux/popup-slice';
import {useAppDispatch, useAppSelector} from '../../hooks';

const Modal: FC<ModalProps> = ({children, onClose, onOpen}): ReactPortal|null => {
  const dispatch = useAppDispatch();
  const {popupShow, popupTitle} = useAppSelector(
    state => ({
      popupShow: state.popup.show,
      popupTitle: state.popup.title,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (popupShow && onOpen) {
      onOpen();
    }
  }, [popupShow, onOpen]);

  const modalClose = useCallback(() => {
    dispatch(popupHide());

    onClose && onClose();
  }, [dispatch, onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') modalClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [modalClose]);

  return popupShow? createPortal(
          <>
            <div data-testid='modal' className={clsx(s['modal'], 'p-10')}>
              <div data-testid='modal-header' className={clsx(s['modal--header'], 'text', 'text_type_main-large')}>
                <span>
                  {popupTitle}
                </span>
                <CloseIcon type={'primary'} onClick={modalClose}/>
              </div>

              <div data-testid='modal-body' className={s['modal--body']}>
                {children}
              </div>
            </div>

            <ModalOverlay modalClose={modalClose}/>
          </>,
          document.getElementById('react-modals') as HTMLElement
        ) : null;
}

export default Modal;
