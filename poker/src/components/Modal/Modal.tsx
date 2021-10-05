import React, { FC } from 'react';
import GeneralButton from '../GeneralButton/GeneralButton';

import styles from './KickModal.module.scss';

interface Props {
  title: string;
  text: string;
  handleClickConfirm?: () => void;
  handleClickCancel?: () => void;
}

const Modal: FC<Props> = ({ title, text, handleClickConfirm, handleClickCancel }) => (
  <div className={styles.wrap}>
    <div className={styles.modal}>
      <h2 className={styles.header}>{title}</h2>
      <p className={styles.text}>{text}</p>
      <div className={styles.buttons}>
        <GeneralButton type="button" label={'Yes'} onClick={handleClickConfirm} primaryBG />
        <GeneralButton type="button" label={'No'} onClick={handleClickCancel} />
      </div>
    </div>
  </div>
);

export default Modal;
