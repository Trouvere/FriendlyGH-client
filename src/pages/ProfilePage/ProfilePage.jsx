/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Contacts from './Contacts';
import HeaderProfile from './HeaderProfile';
import style from './styles.module.css';
import InterestsBlock from './GroupsBlock';
import EditBtn from '../../components/EditingBtn';

const ProfilePage = ({ profileData, isOwner }) => {
  const history = useHistory();
  const goToEditPage = () => {
    history.push('/profile/edit');
  };
  return (
    <div className={style.profilePage}>
      <HeaderProfile
        avatar={profileData.photo || ''}
        firstName={profileData.firstName || ''}
        lastName={profileData.lastName || ''}
        location={profileData.location || ''}
        aboutMe={profileData.aboutMe || ''}
        roleInCompany={profileData.roleInCompany}
      />
      <Contacts contacts={profileData.contacts} />
      <InterestsBlock interests={profileData.interests} label="Interests" />
      {isOwner && (
        <div className={style.editBtnBlock}>
          <EditBtn onSignUpButtonClick={goToEditPage} />
        </div>
      )}
    </div>
  );
};

ProfilePage.propTypes = {
  profileData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    location: PropTypes.string,
    roleInCompany: PropTypes.string,
    photo: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.object),
    contacts: PropTypes.shape({
      telegram: PropTypes.string,
      phone: PropTypes.string,
      skype: PropTypes.string,
      linkedIn: PropTypes.string
    }),
    aboutMe: PropTypes.string,
    groups: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  isOwner: PropTypes.bool.isRequired
};

export default ProfilePage;
