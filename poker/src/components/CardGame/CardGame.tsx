import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { CardGameSetting, SIZES } from '../../types/common';
import {
  selectedCard,
  issueIdSelectedSlice,
  isPlayingNowSlice,
  currentUserCheckCardWithIdSlice,
} from '../../redux/slices/gameProcessSlice';
import { currentRoomSlice, currentUserSlice } from '../../redux/slices/roomSlice';
import { SocketContext } from '../../socketContext';
import Card from '../Card/Card';

import styles from './CardGame.module.scss';

interface Props {
  card: CardGameSetting;
}

const CardGame: FC<Props> = ({ card }) => {
  const socket = React.useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const dispatch = useDispatch();

  const room = useSelector(currentRoomSlice);
  const { userId } = useSelector(currentUserSlice);
  const issueIdSelected = useSelector(issueIdSelectedSlice);
  const currentUserCheckCardWithId = useSelector(currentUserCheckCardWithIdSlice);
  const isPlayingNow = useSelector(isPlayingNowSlice);

  const isChecked = card.id === currentUserCheckCardWithId;

  const handleSelectedCard = (): void => {
    if (isPlayingNow && !currentUserCheckCardWithId) {
      dispatch(selectedCard(card.id));
      socket.emit('user-check-game-card', room, userId, issueIdSelected, card.id, card.value);
    }
  };

  return (
    <div onClick={handleSelectedCard} className={isChecked ? styles.card_wrapper_checked : styles.card_wrapper}>
      <Card card={card} isShowCards={(isPlayingNow && !currentUserCheckCardWithId) || isChecked} size={SIZES.MEDIUM} />
    </div>
  );
};

export default CardGame;
