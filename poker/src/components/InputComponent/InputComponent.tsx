import React, { FC, ChangeEvent } from 'react';
import styles from './InputComponent.module.scss';

interface Props {
  name?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  isReadOnly?: boolean;
}

const InputComponent: FC<Props> = ({ onChange, name, value, isError, isReadOnly }) => (
  <input
    name={name}
    value={value}
    onChange={onChange}
    className={isError ? styles.InputComponent_error : styles.InputComponent}
    readOnly={isReadOnly}
  />
);

export default InputComponent;
