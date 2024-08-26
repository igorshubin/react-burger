import React, {FC} from 'react';
import s from './styles.module.css';
import {ButtonLoaderProps} from '../../utils/props';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

const ButtonLoader: FC<ButtonLoaderProps> = ({
   onClick,
   text,
   type = 'submit',
   status = 'idle',
   success = false,
   disabled = false
}) => {

  const handleClick = () => {
    if (status === 'loading') {
      return false;
    } else {
      onClick && onClick();
    }
  }

  return (
    <Button data-testid='button-submit' disabled={disabled} onClick={handleClick} htmlType={type} extraClass={s['button-loader']}>
      {status === 'loading' ? (
        <>
          <span className={s['button-content-spinner']} />
          <span>{text.loading ?? 'Обработка'}...</span>
        </>
      ) : (
        <>
          {success && text.success && text.success}
          {success && !text.success && text.idle}

          {(status === 'idle' || status === 'error') && !success && text.idle}
        </>
      )}
    </Button>
  )
};

export default ButtonLoader;
