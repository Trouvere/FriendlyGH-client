import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePage from './ProfilePage';
import useProfile from '../../plugins/Hooks/useProfile';
import { getUserProfile } from '../../store/reducers/UserReducer';
import PreloaderPage from '../../components/Preloader/Page';

const ProfilePageContainer = (props) => {
  const profileData = useProfile();
  const dispatch = useDispatch();
  const userProfileStatus = useSelector((state) => state.userData.status);
  const userProfile = useSelector((state) => state.userData.userProfile);
  const profileStatus = useSelector((state) => state.profileData.status);
  // eslint-disable-next-line react/destructuring-assignment
  const userId = Number(props.match.params.userId);
  useEffect(() => {
    if (profileStatus === 'success') {
      if (userId !== profileData.id) {
        if (userProfileStatus === 'success') {
          if (userId !== userProfile.id) {
            dispatch(getUserProfile(userId));
          }
        }
        if (userProfileStatus === 'idle') {
          dispatch(getUserProfile(userId));
        }
      }
    }
  }, [
    profileStatus,
    userProfileStatus,
    profileData.id,
    userProfile.id,
    userId
  ]);
  if (profileStatus === 'success') {
    if (userId === profileData.id) {
      return <ProfilePage profileData={profileData} isOwner />;
    }
    if (userProfileStatus === 'success') {
      if (userId === userProfile.id) {
        return <ProfilePage profileData={userProfile} isOwner={false} />;
      }
    }
  }

  return <PreloaderPage />;
};

export default ProfilePageContainer;
