import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardIssueModal from '../CardIssueModal/CardIssueModal';
import { Issue } from '../../types/common';
import pencil from '../../assets/images/svg/pencil.svg';
import basket from '../../assets/images/svg/basket.svg';
import plus from '../../assets/images/svg/plus2.svg';
import { createIs, selectIssues, removeIs } from '../../redux/slices/issuesSlice';

import styles from './CardIssue.module.scss';

interface Props {
  issue: Issue;
  isNew?: boolean;
}

const options = { create: 'create', fixed: 'fixed', remove: 'remove' };

const CardIssue: FC<Props> = ({ issue, isNew }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [option, setOption] = useState<string>();
  const dispatch = useDispatch();
  const issues = useSelector(selectIssues);

  const handleCreateIssue = (): void => {
    dispatch(createIs(issue));
    setOption(options.create);
    setIsModalOpen(true);
  };

  const handleFixedIssue = (): void => {
    setOption(options.fixed);
    setIsModalOpen(true);
  };

  const handleRemoveIssue = (): void => {
    dispatch(removeIs(issue));
  };

  return (
    <div className={styles.cardIssue_wrap}>
      {isNew ? (
        <div className={styles.cardIssue_item}>
          <h3>Create new issue</h3>
          <button type="button" onClick={handleCreateIssue}>
            <img src={plus} alt="create new" />
          </button>
        </div>
      ) : (
        <div className={styles.cardIssue_item}>
          <p>issue {Number(issue.id) + 1}</p>
          <h3>{issue.title}</h3>
          <div className={styles.cardIssue_item_buttons}>
            <button type="button" onClick={handleFixedIssue}>
              <img src={pencil} alt="pencil" />
            </button>
            <button type="button" onClick={handleRemoveIssue}>
              <img src={basket} alt="basket" />
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <CardIssueModal
          setIsOpen={setIsModalOpen}
          issue={option === 'create' ? issues[issues.length - 1] : issue}
          option={option}
        />
      )}
    </div>
  );
};

export default CardIssue;
