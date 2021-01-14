import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UsersCard from '../../components/UserCard';
import style from './styles.module.css';
import Input from '../../components/Input';
import searchImg from '../../assets/img/icons/search.svg';
import Select from '../../components/Select';

const UsersPage = ({ users, locations, genders }) => {
  const [searchByName, setSearchByName] = useState('');
  const [searchByLocation, setSearchByLocation] = useState('');
  const [searchByGender, setSearchByGender] = useState('');
  const [searchByInterests, setSearchByInterests] = useState('');

  const onSearchByNameChange = (e) => {
    setSearchByName(e.target.value);
  };
  const onSearchByLocationChange = (e) => {
    setSearchByLocation(e.target.value);
  };
  const onSearchByGenderChange = (e) => {
    setSearchByGender(e.target.value);
  };
  const onSearchByInterestsChange = (e) => {
    setSearchByInterests(e.target.value);
  };
  const searchItems = (items) => {
    let filterUsers = items;
    if (searchByName.length !== 0) {
      const searchByNameLowerCase = searchByName.toLowerCase();
      filterUsers = filterUsers.filter((item) => {
        if (item.firstName && item.lastName) {
          return (
            item.firstName.toLowerCase().includes(searchByNameLowerCase) ||
            item.lastName.toLowerCase().includes(searchByNameLowerCase)
          );
        }
        return false;
      });
    }
    if (searchByLocation.length !== 0 && searchByLocation !== 'All location') {
      const searchByLocationLowerCase = searchByLocation.toLowerCase();
      filterUsers = filterUsers.filter((item) => {
        if (item.location) {
          return item.location
            .toLowerCase()
            .includes(searchByLocationLowerCase);
        }
        return false;
      });
    }
    if (searchByGender.length !== 0 && searchByGender !== 'All gender') {
      const searchByGenderLowerCase = searchByGender.toLowerCase();
      filterUsers = filterUsers.filter((item) => {
        return item.gender === searchByGenderLowerCase;
      });
    }
    if (searchByInterests.length !== 0) {
      const searchByInterestsLowerCase = searchByInterests.toLowerCase();
      filterUsers = filterUsers.filter((item) => {
        const interest = item.interests.filter((el) => {
          return el.toLowerCase().includes(searchByInterestsLowerCase);
        });
        return interest.length !== 0;
      });
    }

    return filterUsers;
  };
  const usersCard = searchItems(users).map((el) => (
    <UsersCard
      name={el.firstName}
      lastName={el.lastName}
      photo={el.photo}
      position={el.roleInCompany}
      location={el.location}
      key={el.id}
      id={el.id}
    />
  ));
  return (
    <div className={style.usersPage}>
      <div className={style.wrapperSearch}>
        <h3>Search users</h3>
        <div className={style.wrapperSearchInput}>
          <Input
            form="oval"
            name="searchByName"
            placeholder="Find Users"
            onChange={onSearchByNameChange}
            value={searchByName}
            icon={searchImg}
            id="searchByName"
          />
        </div>
        <div className={style.wrapperSearchInput}>
          <Select
            name="searchByLocation"
            placeholder="All location"
            onChange={onSearchByLocationChange}
            value={searchByLocation}
            icon={searchImg}
            options={locations}
            id="searchByLocation"
          />
        </div>
        <div className={style.wrapperSearchInput}>
          <Input
            form="oval"
            name="searchByInterests"
            placeholder="Find by interest"
            onChange={onSearchByInterestsChange}
            value={searchByInterests}
            icon={searchImg}
            id="searchByInterests"
          />
        </div>
        <div className={style.wrapperSearchInput}>
          <Select
            name="gander"
            placeholder="All gender"
            onChange={onSearchByGenderChange}
            value={searchByGender}
            icon={searchImg}
            options={genders}
            id="searchByLocation"
          />
        </div>
      </div>
      <div className={style.wrapperUsersBlock}>
        <div className={style.cardBlock}>{usersCard}</div>
      </div>
    </div>
  );
};

export default UsersPage;

UsersPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  genders: PropTypes.arrayOf(PropTypes.object).isRequired
};
