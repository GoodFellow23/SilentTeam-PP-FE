import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import GeneralButton from '../GeneralButton/GeneralButton';
import InputComponent from '../InputComponent/InputComponent';
import TitleSection from '../TitleSection/TitleSection';
import { Issue } from '../../types/common';
import { fixIs, removeIs } from '../../redux/slices/issuesSlice';

import styles from './CardIssueModal.module.scss';

interface Props {
  setIsOpen: (e: boolean) => void;
  issue: Issue;
  option?: string;
}

const CardIssueModal: FC<Props> = ({ setIsOpen, issue, option }) => {
  const dispatch = useDispatch();

  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleOnChangeIssueTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const v = e.target.value;
    const len = v.length;
    if (len < 3) {
      setError('*the field "Title" must be at least 3 characters');
      setIsError(true);
    } else if (len > 12) {
      setError('*the field "Title" must be no more than 12 characters');
      setIsError(true);
    } else {
      setError('');
      setIsError(false);
    }
    dispatch(fixIs({ ...issue, title: e.target.value }));
  };

  const handleOnChangeIssueDesc = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(fixIs({ ...issue, desc: e.target.value }));
  };

  const handleClickCancel = (): void => {
    if (issue.title.length === 0) dispatch(removeIs(issue));
    setIsOpen(false);
  };

  const handelSubmit = (): void => {
    if (issue.title.length === 0) dispatch(removeIs(issue));
    setIsOpen(false);
  };

  return (
    <div className={styles.issue_modal_wrap} onClick={handleClickCancel}>
      <form
        className={styles.issue_modal_form}
        onClick={(e): void => {
          e.stopPropagation();
        }}
        onSubmit={handelSubmit}
      >
        {option === 'remove' ? (
          <TitleSection title="Are you sure about that?" isCapitalLetters />
        ) : (
          <>
            <TitleSection title="Enter issue specification" isCapitalLetters />
            <label className={styles.modal_issueTitle} htmlFor="issueTitle">
              Title
            </label>
            <InputComponent name="issueTitle" value={issue.title} onChange={handleOnChangeIssueTitle} />
            <label className={styles.modal_issueDesc} htmlFor="issueTitle">
              Description
            </label>
            <InputComponent name="issueDesc" value={issue.desc} onChange={handleOnChangeIssueDesc} />
          </>
        )}

        {isError && <p className={styles.issue_error}>{error}</p>}
        <div className={styles.issue_modal_footer}>
          <GeneralButton type="submit" label={'Accept'} primaryBG isDisable={isError} />
          <GeneralButton type="button" label={'Cancel'} onClick={handleClickCancel} />
        </div>
      </form>
    </div>
  );
};

export default CardIssueModal;
