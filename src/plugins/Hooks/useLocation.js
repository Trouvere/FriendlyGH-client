import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { requestGeolocation } from '../../store/reducers/GeolocationReducer';

const mapRegionToCity = {
  Grodnenskaya: 'Grodno',
  Brestskaya: 'Brest',
  Minskaya: 'Minsk',
  Mogilevskaya: 'Mogilev',
  Vitebskaya: 'Vitebsk',
  Gomelskaya: 'Gomel'
};

const useLocation = (userProfileLocation, statusProfile) => {
  let location = userProfileLocation;
  const dispatch = useDispatch();
  const { status, geolocation } = useSelector((state) => state.geoData);
  useEffect(() => {
    if (
      status === 'idle' &&
      statusProfile === 'success' &&
      !userProfileLocation
    ) {
      dispatch(requestGeolocation());
    }
  }, [status, statusProfile]);
  if (!userProfileLocation && status === 'success') {
    location = mapRegionToCity[geolocation] || 'change';
  }
  return location;
};

export default useLocation;
