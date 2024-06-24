import {FC} from 'react';
import s from './styles.module.css';
import {ModalOverlayProps} from '../../utils/props';

const ModalOverlay: FC<ModalOverlayProps> = ({modalClose}) => {
  return <div onClick={modalClose} className={s['modal--overlay']}/>;
}

export default ModalOverlay;
