import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersPage from './UsersPage';
import { requestAllUser } from '../../store/reducers/UsersReducer';
import useProfile from '../../plugins/Hooks/useProfile';
import { setLocation } from '../../store/reducers/LocationReducer';

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
  return <UsersPage users={users} locations={locations} genders={genders} />;
};

export default UsersPageContainer;
