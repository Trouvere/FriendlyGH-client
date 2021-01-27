/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import HeaderEditProfile from './HeaderEditProfile/index';
import ContactsEditPage from './ContactsEdit';
import style from './styles.module.css';
import InterestsBlockEditPage from './InterestsBlockEditPage';
import { inputForFromikValidation } from '../../plugins/validation';
import { userApi } from '../../API';
import { setLocation } from '../../store/reducers/LocationReducer';
import { setRoleInCompany } from '../../store/reducers/RoleInCompanyReducer';
import { refreshInformation, setMe } from '../../store/reducers/ProfileReducer';
import useLocation from '../../plugins/Hooks/useLocation';
import PopUp from '../../components/PopUp';
import AddChatForm from './FormForAddCustomInterest/FormForAddCustomInterest';

const EditProfile = () => {
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const changeStatus = () => {
    dispatch(refreshInformation());
  };
  const { roleDataStatus, profileDataStatus, locationDataStatus } = useSelector(
    (state) => ({
      roleDataStatus: state.roleData.status,
      profileDataStatus: state.profileData.status,
      locationDataStatus: state.locationData.status
    })
  );

  useEffect(() => {
    if (roleDataStatus === 'idle') {
      dispatch(setRoleInCompany());
    }
  }, [roleDataStatus]);
  useEffect(() => {
    if (locationDataStatus === 'idle') {
      dispatch(setLocation());
    }
  }, [locationDataStatus]);
  useEffect(() => {
    if (profileDataStatus === 'idle') {
      dispatch(setMe());
    }
  }, [profileDataStatus]);
  const rolesInCompany = useSelector(
    (state) => state.roleData.roleInCompanyData
  );
  const allLocations = useSelector((state) => state.locationData.allLocations);
  const {
    firstName,
    lastName,
    id,
    aboutMe,
    photo,
    roleInCompany,
    contacts,
    interests
  } = useSelector((state) => state.profileData.profile);
  const userProfileLocation = useSelector(
    (state) => state.profileData.profile.location
  );
  const location = useLocation(userProfileLocation, profileDataStatus);

  let gender = useSelector((state) => state.profileData.profile.gender);
  if (!gender) {
    gender = 'male';
  }
  const contactsValue = {
    phone: '',
    linkedIn: '',
    telegram: '',
    skype: ''
  };
  const initContact = {
    linkedIn: '',
    phone: '',
    skype: '',
    telegram: ''
  };
  const interestsId = interests.map((el) => el.id);

  const contactsName = Object.keys(initContact);
  contactsName.forEach((element) => {
    if (contacts) {
      contactsValue[element] = contacts[element];
    }
  });
  return (
    <>
      {isOpenPopUp && (
        <PopUp onClick={() => setIsOpenPopUp(false)}>
          <AddChatForm onSubmit={() => setIsOpenPopUp(false)} />
        </PopUp>
      )}
      <Formik
        enableReinitialize
        initialValues={{
          firstName: firstName || '',
          lastName: lastName || '',
          aboutMe: aboutMe || '',
          photo,
          roleInCompany: roleInCompany || '',
          location: location || '',
          select: '',
          phone: contactsValue.phone,
          linkedIn: contactsValue.linkedIn,
          telegram: contactsValue.telegram,
          skype: contactsValue.skype,
          interests: interestsId,
          gender: gender || ''
        }}
        validationSchema={inputForFromikValidation}
        onSubmit={async (data) => {
          await userApi.updateUser(data);
          changeStatus();
          history.push(`/profile/${id}`);
        }}
      >
        {() => (
          <Form className={style.editProfile}>
            <h3 className={style.namePage}>Edit Profile</h3>
            <HeaderEditProfile
              avatar={photo}
              rolesInCompany={rolesInCompany}
              allLocations={allLocations}
            />
            <ContactsEditPage contacts={contacts} />
            <InterestsBlockEditPage
              groups={interests}
              onClick={() => {
                setIsOpenPopUp(true);
              }}
            />
            <button type="submit" className={style.submitBtn}>
              Edit Profile
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditProfile;
