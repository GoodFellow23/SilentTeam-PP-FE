import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';

import { CardGameSetting } from '../../types/common';
import { createGC, fixGC, sortGC, removeGC } from '../../redux/slices/gameCardsSlice';
import plus from '../../assets/images/svg/plus.svg';
import coffeetime from '../../assets/images/svg/cap_of_coffee.svg';
import pencil from '../../assets/images/svg/pencil.svg';
import basket from '../../assets/images/svg/basket.svg';

import styles from './CardGameLobby.module.scss';

interface Props {
  card: CardGameSetting;
  isNew?: boolean;
  minValue: number;
  maxValue: number;
}

const CardGameLobby: FC<Props> = ({ card, isNew, minValue, maxValue }) => {
  const [isVisibleInput, setIsVisibleInput] = useState(false);
  const dispatch = useDispatch();

  const handleToggleVisible = (): void => {
    setIsVisibleInput(!isVisibleInput);
  };

  const handleCreateCard = (): void => {
    const v = Number(card.value) >= maxValue ? maxValue.toString() : card.value;
    dispatch(createGC({ id: card.id, value: v }));
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const v = Number(e.target.value) >= maxValue ? maxValue.toString() : e.target.value;
    dispatch(fixGC({ id: card.id, value: v }));
  };

  const handleOnBlur = (): void => {
    setIsVisibleInput(false);
    dispatch(sortGC());
  };

  const handleRemoveCard = (): void => {
    dispatch(removeGC(card));
  };

  return (
    <div className={styles.Card_wrap}>
      {card.value === 'coffeetime' && (
        <div className={styles.Card_coffeetime}>
          <img src={coffeetime} alt="cap of coffee" />
        </div>
      )}
      {Number(card.value) >= 0 && !isNew && (
        <div className={styles.Card_value}>
          <p className={styles.Card_value_top}>{card.value}</p>
          {isVisibleInput ? (
            <input
              type="number"
              autoFocus
              min={minValue}
              max={maxValue}
              value={card.value}
              onChange={handleChangeValue}
              onBlur={handleOnBlur}
            />
          ) : (
            <>
              <img src={pencil} alt="pencil" onClick={handleToggleVisible} />
              <img src={basket} alt="remove" onClick={handleRemoveCard} />
            </>
          )}
          <p className={styles.Card_value_bottom}>{card.value}</p>
        </div>
      )}
      {isNew && (
        <div className={styles.Card_new} onClick={handleCreateCard}>
          <img src={plus} alt="add new card" />
        </div>
      )}
    </div>
  );
};

export default CardGameLobby;
