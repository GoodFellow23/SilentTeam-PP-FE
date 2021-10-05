import React, { FC, MouseEvent } from 'react';
import styles from './GeneralButton.module.scss';

interface Props {
  label: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  primaryBG?: boolean;
  isDisable?: boolean;
}

const GeneralButton: FC<Props> = ({ label, type, onClick, primaryBG, isDisable }) => (
  <button
    type={type}
    onClick={onClick}
    className={primaryBG ? styles.GeneralButton_primary : styles.GeneralButton_secondary}
    disabled={isDisable}
  >
    {label}
  </button>
);

export default GeneralButton;
