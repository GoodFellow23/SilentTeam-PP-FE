import React from 'react';

import m from './MainPage.module.scss';

import MainPageTitle from '../../components/MainPageTitle/MainPageTitle';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import InputComponent from '../../components/InputComponent/InputComponent';

const MainPage = () => {
  const handleCreateNewGame = () => {
    console.log('start new game');
  };

  const handleConnectToGame = () => {
    console.log('connect');
  };

  const handleEnterUrlGame = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className={m.MainPage_wrap}>
      <MainPageTitle />
      <h3>Start your planning:</h3>
      <div className={m.MainPage_item}>
        <label>Create session:</label>
        <GeneralButton
          label={'Start new game'}
          onClick={handleCreateNewGame}
          primaryBG={1}
        />
      </div>
      <h3>OR:</h3>
      <label>
        Connect to lobby by <span>URL</span>:
      </label>
      <div className={m.MainPage_item}>
        <InputComponent onChange={handleEnterUrlGame} />
        <GeneralButton
          label={'Connect'}
          onClick={handleConnectToGame}
          primaryBG={1}
        />
      </div>
    </div>
  );
};

export default MainPage;
