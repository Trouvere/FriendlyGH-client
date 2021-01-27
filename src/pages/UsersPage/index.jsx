import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersPage from './UsersPage';
import { requestAllUser } from '../../store/reducers/UsersReducer';
import useProfile from '../../plugins/Hooks/useProfile';
import { setLocation } from '../../store/reducers/LocationReducer';
import PreloaderPage from '../../components/Preloader/Page';
import style from './styles.module.css';

const genders = [{ name: 'Male' }, { name: 'Female' }];

const UsersPageContainer = () => {
  useProfile();
  const dispatch = useDispatch();
  const { usersDataStatus, locationDataStatus } = useSelector((state) => ({
    usersDataStatus: state.usersData.status,
    locationDataStatus: state.locationData.status
  }));

  useEffect(() => {
    if (usersDataStatus === 'idle') {
      dispatch(requestAllUser());
    }
  }, [usersDataStatus]);
  useEffect(() => {
    if (locationDataStatus === 'idle') {
      dispatch(setLocation());
    }
  }, [locationDataStatus]);
  const { users, locations } = useSelector((state) => ({
    users: state.usersData.allUsers,
    locations: state.locationData.allLocations
  }));
  if (usersDataStatus === 'success' && locationDataStatus === 'success') {
    return <UsersPage users={users} locations={locations} genders={genders} />;
  }
  if (usersDataStatus === 'failed' || locationDataStatus === 'failed') {
    return (
      <div className={style.noConnection}>
        Sorry, there is an internet connection error. Please try again or try
        using a different network.
      </div>
    );
  }
  return <PreloaderPage />;
};

export default UsersPageContainer;
