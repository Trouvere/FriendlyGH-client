import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './styles.module.css';
import { requestAllInterest } from '../../../store/reducers/InterestReducer';
import { CheckboxForFormik } from '../../../components/ForFormik';
import Input from '../../../components/Input';
import searchImg from '../../../assets/img/icons/search.svg';
import plus from '../../../assets/img/icons/plus.svg';
import ButtonWithImg from '../../../components/ButtonWithImg';

const InterestsBlockEditPage = ({ onClick }) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { interests, statusInterests } = useSelector((state) => ({
    interests: state.interestData.allInterest,
    statusInterests: state.interestData.status
  }));

  useEffect(() => {
    if (statusInterests === 'idle') {
      dispatch(requestAllInterest());
    }
  }, [statusInterests]);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const searchItems = (items) => {
    if (search.length === 0) {
      return items;
    }
    const searchToLowerCase = search.toLowerCase();
    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(searchToLowerCase) > -1;
    });
  };

  const tags = Array.from(
    new Set(searchItems(interests).map((el) => el.tagId))
  );

  const interestBlocks = tags.map((el) => {
    const interestInput = searchItems(interests).map((interest) => {
      return (
        interest.tagId === el && (
          <CheckboxForFormik
            key={interest.id}
            id={interest.id}
            interest={interest}
            name="interests"
            value={interest.id}
          />
        )
      );
    });
    return (
      <div className={style.interestBlocks} key={el}>
        <h3 className={style.headerInterests}>{el}</h3>
        <div className={style.interests}>{interestInput}</div>
      </div>
    );
  });
  return (
    <>
      <div className={style.groupsBlock}>
        <div className={style.header}>
          <h2>Interests</h2>
        </div>

        <div className={style.wrapperEditBlockCustomInterests}>
          <div className={style.wrapperSearchInput}>
            <Input
              form="oval"
              name="search"
              placeholder="Find Interests"
              onChange={onSearchChange}
              value={search}
              icon={searchImg}
              id="search"
            />
          </div>

          <div className={style.btnWrapper}>
            <ButtonWithImg
              type="button"
              text="add interests"
              img={plus}
              onClick={onClick}
            />
          </div>
        </div>
        <div id="checkbox-group" />
        <div
          role="group"
          aria-labelledby="checkbox-group"
          className={style.groups}
        >
          {interestBlocks}
        </div>
      </div>
    </>
  );
};

export default InterestsBlockEditPage;
