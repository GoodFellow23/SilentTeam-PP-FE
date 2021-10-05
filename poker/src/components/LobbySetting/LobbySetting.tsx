import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TitleSection from '../TitleSection/TitleSection';
import Checkbox from '../Checkbox/Checkbox';
import InputComponent from '../InputComponent/InputComponent';
import CardGameLobby from '../CardGameLobby/CardGameLobby';
import CardStoryTypeShort from '../CardStoryTypeShort/CardStoryTypeShort';

import { selectGameCards } from '../../redux/slices/gameCardsSlice';
import {
  selectGameSetting,
  changeMasterIsPlayer,
  changeIsNeededTimer,
  changeStoryType,
  changeStoryTypeShort,
  changeRoundTime,
} from '../../redux/slices/gameSettingSlice';
import close from '../../assets/images/svg/timerSettingClose.svg';

import styles from './LobbySetting.module.scss';

const LobbySetting: FC = () => {
  const [isVisibleRoundTime, setIsVisibleRoundTime] = useState<boolean>(false);
  const cards = useSelector(selectGameCards);
  const settings = useSelector(selectGameSetting);
  const dispatch = useDispatch();

  const newCard = {
    id: (cards.reduce((max, item) => Math.max(max, Number(item.id)), 0) + 1).toString(),
    value: (Number(cards[cards.length - 1].value) * 2).toString(),
  };

  const handleChangeMasterOrPlayer = (): void => {
    dispatch(changeMasterIsPlayer());
  };

  const handleChangeTimerNeeded = (): void => {
    dispatch(changeIsNeededTimer());
  };

  const handleChangeStoryType = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeStoryType(e.target.value));
    dispatch(changeStoryTypeShort(e.target.value));
  };

  const handleChangeMinutes = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeRoundTime((settings.roundTime % 60) + Number(e.target.value) * 60));
  };

  const handleChangeSeconds = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeRoundTime(Math.floor(settings.roundTime / 60) * 60 + Number(e.target.value)));
  };

  const handleChangeVisible = (): void => {
    setIsVisibleRoundTime(true);
  };

  const handleChangeUnvisible = (e: { stopPropagation: () => void }): void => {
    e.stopPropagation();
    setIsVisibleRoundTime(false);
  };

  return (
    <div className={styles.lobbyPage_section}>
      <TitleSection title={'Game settings:'} />
      <div className={styles.lobbyPage_setting_item}>
        <p>Scram master as player:</p>
        <Checkbox name={'master/player'} isChecked={settings.masterIsPlayer} onChange={handleChangeMasterOrPlayer} />
      </div>
      <div className={styles.lobbyPage_setting_item}>
        <p>Is timer needed:</p>
        <Checkbox name={'isTimerNeeded'} isChecked={settings.isNeededTimer} onChange={handleChangeTimerNeeded} />
      </div>
      <div className={styles.lobbyPage_setting_item}>
        <p>Story type:</p>
        <InputComponent name={'storyType'} value={settings.storyType} onChange={handleChangeStoryType} />
      </div>
      <div className={styles.lobbyPage_setting_item}>
        <p>Story type(Short):</p>
        <CardStoryTypeShort label={settings.storyTypeShort} />
      </div>
      <div className={styles.lobbyPage_setting_item}>
        <p>Round time:</p>
        <div className={styles.lobbyPage_setting_time_round} onClick={handleChangeVisible}>
          <div className={styles.time_round_item}>
            {isVisibleRoundTime ? (
              <div className={styles.time_round_item_input}>
                <input
                  name="minutes"
                  type="number"
                  min="0"
                  max="60"
                  value={Math.floor(settings.roundTime / 60)}
                  autoFocus
                  onChange={handleChangeMinutes}
                />
                <input
                  name="seconds"
                  type="number"
                  min="0"
                  max="59"
                  value={settings.roundTime % 60}
                  autoFocus
                  onChange={handleChangeSeconds}
                />
                <div className={styles.time_round_img_wrap} onClick={handleChangeUnvisible}>
                  <img src={close} alt="close" />
                </div>
              </div>
            ) : (
              <>
                <span>{Math.floor(settings.roundTime / 60)}</span> :
                <span>
                  {settings.roundTime % 60 < 10 ? `0${(settings.roundTime % 60).toString()}` : settings.roundTime % 60}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.lobbyPage_setting_item}>
        <p>Add card values:</p>
      </div>
      <div className={styles.lobbyPage_setting_cards}>
        {cards.length > 0
        && cards.map((card) => (
          <CardGameLobby
            key={card.id}
            card={card}
            minValue={settings.minGameCardValue}
            maxValue={settings.maxGameCardValue}
          />
        ))}
        <CardGameLobby card={newCard} isNew minValue={settings.minGameCardValue} maxValue={settings.maxGameCardValue} />
      </div>
    </div>
  );
};

export default LobbySetting;
