import {FC, useEffect} from 'react';
import {createPortal} from 'react-dom';
import s from './styles.module.css';
import {ModalProps} from '../../utils/props';
import clsx from 'clsx';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';

const Modal: FC<ModalProps> = ({children, modalClose, title = ''}) => {
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
    createPortal(
      <>
        <div className={clsx(s['modal'], 'p-10')}>
          <div className={clsx(s['modal--header'], 'text', 'text_type_main-large')}>
            <span>{title}</span>
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
  );
}

export default Modal;
