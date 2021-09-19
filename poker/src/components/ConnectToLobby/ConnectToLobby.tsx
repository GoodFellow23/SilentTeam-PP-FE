import React, { FC, useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client/build/socket';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { useHistory } from 'react-router-dom';
import GeneralButton from '../GeneralButton/GeneralButton';
import InputComponent from '../InputComponent/InputComponent';
import Checkbox from '../Checkbox/Checkbox';
import { ROLES, User } from '../../types/common';
import { updateUser } from '../../redux/slices/userSlice';
import { SocketContext } from '../../socketContext';
import styles from './ConnectToLobby.module.scss';

interface FormState {
  firstName: string;
  lastName: string;
  jobPosition: string;
}

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  role: ROLES;
  url?: string;
}

const ConnectToLobby: FC<Props> = ({ setIsVisible, role, url }) => {
  const history = useHistory();
  const socket = React.useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);
  const dispatch = useDispatch();

  const [error, setError] = useState<FormState>({
    firstName: '',
    lastName: '',
    jobPosition: '',
  });

  const [personalData, setPersonalData] = useState<FormState>({
    firstName: '',
    lastName: '',
    jobPosition: '',
  });
  const [observer, setObserver] = useState<boolean>(false);
  // const [image, setImage] = useState<string>('');

  useEffect(() => {
    if (personalData.firstName === '') {
      const { firstName } = personalData;
      setError((state) => ({ ...state, firstName }));
    }
  }, [personalData]);

  const handelSubmit = (): void => {
    console.log('send form');
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setPersonalData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClickConfirm = (e: SyntheticEvent): void => {
    // e.preventDefault();
    const { firstName, lastName, jobPosition } = personalData;
    const room = url || socket.id;

    const user:User = {
      firstName,
      lastName,
      jobPosition,
      role: observer ? ROLES.OBSERVER : role,
      room,
    };

    dispatch(updateUser(user));
    socket.emit('login', user);
    history.push('/lobby');
  };

  const handleClickCancel = (): void => {
    setIsVisible(false);
  };

  return (
    <div
      className={styles.Form_wrap}
      onClick={(): void => {
        setIsVisible(false);
      }}
    >
      <form
        className={styles.Form}
        onSubmit={handleClickConfirm}
        onClick={(e): void => {
          e.stopPropagation();
        }}
      >
        <div className={styles.Form_header}>
          <h2>Connect to lobby</h2>
          <div className={styles.Form_wrap_checkbox_big_screen}>
            <label className={styles.Form_is_observer} htmlFor="observer">
              Connect as Observer
            </label>
            <Checkbox
              name="observer"
              isChecked={observer}
              onChange={() => setObserver((prev) => !prev)}
            />
          </div>
        </div>

        <div className={styles.Form_body}>
          <label htmlFor={'firstName'}>
            Your First Name:
            {error?.firstName && <span className={styles.Form_error}> Should be fill</span>}
          </label>
          <InputComponent value={personalData.firstName} name={'firstName'} onChange={handleInputChange} />
          <label htmlFor={'lastName'}>Your Last Name:</label>
          <InputComponent value={personalData.lastName} name={'lastName'} onChange={handleInputChange} />
          <label htmlFor={'jobPosition'}>Your job position:</label>
          <InputComponent value={personalData.jobPosition} name={'jobPosition'} onChange={handleInputChange} />
          {/* <label htmlFor={image}>
            Image:
            <input className={styles.Button_blue} type="file" />
          </label> */}
          <div className={styles.Form_wrap_checkbox_small_screen}>
            <label className={styles.Form_is_observer} htmlFor="observer">
              Connect as Observer
            </label>
            <Checkbox
              name="observer"
              isChecked={observer}
              onChange={() => setObserver((prev) => !prev)}
            />
          </div>
        </div>

        <div className={styles.Form_footer}>
          <GeneralButton type="submit" label={'Confirm'} primaryBG />
          <GeneralButton type="button" label={'Cancel'} onClick={handleClickCancel} />
        </div>
      </form>
    </div>
  );
};

export default ConnectToLobby;
