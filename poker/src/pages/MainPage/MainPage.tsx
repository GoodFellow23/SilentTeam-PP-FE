import React, { useState, FC, ChangeEvent, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import MainPageTitle from '../../components/MainPageTitle/MainPageTitle';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import InputComponent from '../../components/InputComponent/InputComponent';
import ConnectToLobby from '../../components/ConnectToLobby/ConnectToLobby';
import { setIsAdmin } from '../../redux/slices/roomSlice';

import styles from './MainPage.module.scss';

const MainPage: FC = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [room, setRoom] = useState<string>('');

  const handleCreateNewGame = (): void => {
    dispatch(setIsAdmin(true));
    setIsVisible(true);
  };

  const handleConnectToGame = (): void => {
    setIsVisible(true);
  };

  const handleEnterUrlGame = (e: ChangeEvent<HTMLInputElement>): void => {
    setRoom(e.target.value);
  };

  useEffect(() => {
    const roomId = window.location.href.split('#')[1] ?? '';
    setRoom(roomId);
  }, []);

  return (
    <div className={styles.MainPage_wrap}>
      <MainPageTitle />
      <h3>Start your planning:</h3>
      <div className={styles.MainPage_item}>
        <label>Create session:</label>
        <GeneralButton type="button" label={'Create new game'} onClick={handleCreateNewGame} primaryBG />
      </div>
      {room && (
        <>
          <h3>OR:</h3>
          <label>
            Connect to lobby by <span>ID</span>:
          </label>
          <div className={styles.MainPage_item}>
            <InputComponent value={room} onChange={handleEnterUrlGame} isReadOnly={true} />
            <GeneralButton type="button" label={'Connect'} onClick={handleConnectToGame} primaryBG />
          </div>
        </>
      )}
      {isVisible && <ConnectToLobby setIsVisible={setIsVisible} url={room} />}
    </div>
  );
};

export default MainPage;
