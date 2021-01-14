import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setMe } from '../../store/reducers/ProfileReducer';

const useProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { status, profile } = useSelector((state) => state.profileData);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(setMe());
    }
    if (status === 'success') {
      // eslint-disable-next-line no-unused-expressions
      profile.firstName || history.push('/profile/edit');
    }
  }, [status]);

  return profile;
};

export default useProfile;
