import React from 'react';
import styles from './Checkbox.module.scss';

interface Props {
  name: string;
  isChecked: boolean;
  onChange?: () => void;
}

const Checkbox: React.FC<Props> = ({ name, isChecked, onChange }) => (
  <div className={styles.Checkbox_container}>
    <input
      type="checkbox"
      className={styles.Checkbox}
      name={name}
      checked={isChecked}
      onChange={onChange}
    />
  </div>
);

export default Checkbox;
