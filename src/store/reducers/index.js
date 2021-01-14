import ProfileReducer from './ProfileReducer';
import AuthReducer from './AuthReducer';
import RoleInCompanyReducer from './RoleInCompanyReducer';
import ChatsReducer from './ChatsReducer';
import InterestReducer from './InterestReducer';
import TagReducer from './TagReducer';
import LocationReducer from './LocationReducer';
import RecommendedChatsReducer from './RecommendedChatsReducer';
import UsersReducer from './UsersReducer';
import UserProfileReducer from './UserReducer';
import GeolocationReducer from './GeolocationReducer';

const reducers = {
  usersData: UsersReducer,
  profileData: ProfileReducer,
  authData: AuthReducer,
  roleData: RoleInCompanyReducer,
  chatsData: ChatsReducer,
  interestData: InterestReducer,
  tagData: TagReducer,
  recommendData: RecommendedChatsReducer,
  locationData: LocationReducer,
  userData: UserProfileReducer,
  geoData: GeolocationReducer
};

export default reducers;
