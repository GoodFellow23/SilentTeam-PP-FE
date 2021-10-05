import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { selectGameCards } from '../../redux/slices/gameCardsSlice';
import { initStatisticsCards } from '../../redux/slices/gameProcessSlice';
import { selectGameSetting } from '../../redux/slices/gameSettingSlice';
import { selectIssues } from '../../redux/slices/issuesSlice';
import { currentRoomSlice } from '../../redux/slices/roomSlice';
import { SocketContext } from '../../socketContext';
import GeneralButton from '../GeneralButton/GeneralButton';

const StartGameButton: FC = () => {
  const socket = React.useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const dispatch = useDispatch();

  const room = useSelector(currentRoomSlice);
  const {
    masterIsPlayer: isAdminBePlayerInGame,
    isNeededTimer,
    storyTypeShort,
    roundTime,
  } = useSelector(selectGameSetting);
  const issues = useSelector(selectIssues);
  const cards = useSelector(selectGameCards);

  const handleStartGame = (): void => {
    dispatch(initStatisticsCards(cards));

    const settings = { isAdminBePlayerInGame, isNeededTimer, storyTypeShort, roundTime };

    socket.emit('start-game', room, settings, issues, cards);
  };

  return (
    <GeneralButton
      type="button"
      label={'Start Game'}
      primaryBG
      onClick={handleStartGame}
      isDisable={issues.length === 0 || cards.length < 3}
    />
  );
};

export default StartGameButton;
