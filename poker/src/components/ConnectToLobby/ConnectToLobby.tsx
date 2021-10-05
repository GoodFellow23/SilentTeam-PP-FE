import React, { FC, useState, ChangeEvent, SyntheticEvent, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client/build/socket';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { useHistory } from 'react-router-dom';

import GeneralButton from '../GeneralButton/GeneralButton';
import InputComponent from '../InputComponent/InputComponent';
import Checkbox from '../Checkbox/Checkbox';

import { Member, ResponseFromSocket, ROLES } from '../../types/common';
import { SocketContext } from '../../socketContext';
import { isAdminSlice, loginUser, setCurrentRoom, setIsAdmin, setIsLate } from '../../redux/slices/roomSlice';
import exitToMainPage from '../../utils/exit';

import styles from './ConnectToLobby.module.scss';

interface FormState {
  firstName: string;
  lastName?: string;
  jobPosition?: string;
}

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  url?: string;
}

const ConnectToLobby: FC<Props> = ({ setIsVisible, url }) => {
  const history = useHistory();
  const isAdmin = useSelector(isAdminSlice);
  const [personalData, setPersonalData] = useState<FormState>({
    firstName: '',
    lastName: '',
    jobPosition: '',
  });
  const [observer, setObserver] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const socket = useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const room = isAdmin ? `room${socket.id}` : url;

  // eslint-disable-next-line no-console
  console.log('SocketId', socket.id);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    if (personalData.firstName.length > 0) {
      // eslint-disable-next-line no-console
      console.log('send form');
      const { firstName, lastName, jobPosition } = personalData;
      // eslint-disable-next-line no-console
      console.log('room:', room);
      // eslint-disable-next-line no-console
      console.log('url', url);

      let userRole = ROLES.USER;
      if (observer) userRole = ROLES.OBSERVER;
      else if (isAdmin) userRole = ROLES.ADMIN;

      const user: Member = {
        userId: socket.id,
        firstName,
        lastName,
        job: jobPosition,
        role: userRole,
      };

      const callback = (response: ResponseFromSocket): void => {
        // eslint-disable-next-line no-console
        console.log(response);

        const { eventName, code, error: responseError, data } = response;

        if (responseError) {
          // eslint-disable-next-line no-console
          console.log(`${eventName}: ${code}: ${responseError}`);
          history.push('/');
          exitToMainPage();
        } else {
          const { user: responseUser, isLate: responseIsLate } = data;
          dispatch(setCurrentRoom(responseUser.room));
          const userToRedux = {
            userId: responseUser.userId,
            lastName: responseUser.lastName,
            firstName: responseUser.firstName,
            job: responseUser.job,
            role: responseUser.role,
          };
          dispatch(setIsLate(responseIsLate));
          dispatch(loginUser(userToRedux));
          history.push('/lobby');
        }
      };

      socket.emit('login', { user, room }, callback);
    } else {
      setError('Please fill the form');
      setIsError(true);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const v = e.target.value;
    const len = v.length;
    if (len < 3) {
      setError('*the field "Name" must be at least 3 characters');
      setIsError(true);
    } else if (len > 12) {
      setError('*the field "Name" must be no more than 12 characters');
      setIsError(true);
    } else {
      setError('');
      setIsError(false);
    }
    setPersonalData((state) => ({ ...state, firstName: v }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setPersonalData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClickCancel = (): void => {
    dispatch(setIsAdmin(false));
    setIsVisible(false);
  };

  return (
    <div className={styles.Form_wrap} onClick={handleClickCancel}>
      <form
        className={styles.Form}
        onSubmit={handleSubmit}
        onClick={(e): void => {
          e.stopPropagation();
        }}
      >
        <div className={styles.Form_header}>
          <h2>Connect to lobby</h2>
          {!isAdmin && (
            <div className={styles.Form_wrap_checkbox_big_screen}>
              <label className={styles.Form_is_observer} htmlFor="observer">
                Connect as Observer
              </label>
              <Checkbox name="observer" isChecked={observer} onChange={(): void => setObserver((prev) => !prev)} />
            </div>
          )}
        </div>

        <div className={styles.Form_body}>
          <label htmlFor={'firstName'}>Your First Name:</label>
          <InputComponent
            value={personalData.firstName}
            name={'firstName'}
            onChange={handleNameChange}
            isError={isError}
          />
          <label htmlFor={'lastName'}>Your Last Name:</label>
          <InputComponent value={personalData.lastName} name={'lastName'} onChange={handleInputChange} />
          <label htmlFor={'jobPosition'}>Your job position:</label>
          <InputComponent value={personalData.jobPosition} name={'jobPosition'} onChange={handleInputChange} />
          {!isAdmin && (
            <div className={styles.Form_wrap_checkbox_small_screen}>
              <label className={styles.Form_is_observer} htmlFor="observer">
                Connect as Observer
              </label>
              <Checkbox name="observer" isChecked={observer} onChange={(): void => setObserver((prev) => !prev)} />
            </div>
          )}
        </div>

        {isError && <p className={styles.Form_error}>{error}</p>}
        <div className={styles.Form_footer}>
          <GeneralButton type="submit" label={'Confirm'} primaryBG isDisable={isError} />
          <GeneralButton type="button" label={'Cancel'} onClick={handleClickCancel} />
        </div>
      </form>
    </div>
  );
};

export default ConnectToLobby;
