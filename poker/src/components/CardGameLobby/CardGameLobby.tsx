import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';

import plus from '../../assets/images/svg/plus.svg';
import coffeetime from '../../assets/images/svg/cap_of_coffee.svg';
import pencil from '../../assets/images/svg/pencil.svg';
import styles from './CardGameLobby.module.scss';
import { createGC, fixGC, sortGC, removeGC } from '../../redux/slices/gameCardsSlice';
import { CardGame } from '../../types/common';
import basket from '../../assets/images/svg/basket.svg';

interface Props {
  card: CardGame;
  isNew?: boolean;
}

const CardGameLobby: FC<Props> = ({ card, isNew }) => {
  const [isVisibleInput, setIsVisibleInput] = useState(false);
  const dispatch = useDispatch();

  const handleToggleVisible = (): void => {
    setIsVisibleInput(!isVisibleInput);
  };

  const handleCreateCard = (): void => {
    dispatch(createGC(card));
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(fixGC({ id: card.id, value: e.target.value }));
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
              min="0"
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
