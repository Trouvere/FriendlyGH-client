import React from 'react';
import PropTypes from 'prop-types';
import SubInterestsBlock from '../../../components/SubInterestsBlock';
import HeaderInterests from '../HeaderGroupsBlock';
import style from './styles.module.css';

const InterestsBlock = ({ interests, label }) => {
  const group = Array.from(new Set(interests.map((el) => el.tagId)));
  const chatsPoint = group.map((el) => {
    const span = interests.map(
      (interest) =>
        interest.tagId === el && (
          <li className={style.interest} key={interest.id}>
            <span>{interest.name}</span>
          </li>
        )
    );
    return (
      <div className={style.wrapper} key={el}>
        <SubInterestsBlock>
          <h3 className={style.groupHeader}>{el}</h3>
          <ul>{span}</ul>
        </SubInterestsBlock>
      </div>
    );
  });
  return (
    <div className={style.groupsBlock}>
      <HeaderInterests label={label} />
      <div className={style.groups}>{chatsPoint}</div>
    </div>
  );
};

InterestsBlock.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default InterestsBlock;
