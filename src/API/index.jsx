import * as axios from 'axios';

const instAxios = axios.create({
  // baseURL: 'http://localhost:8080/api/',
  baseURL: 'https://friendly-gh.herokuapp.com/api/',
  headers: {
    'x-access-token': {
      toString() {
        return `${JSON.parse(window.localStorage.getItem('authData'))?.token}`;
      }
    }
  }
});

export const authenticationApi = {
  signUp: ({ email, password }) => {
    return instAxios
      .post('auth/signup', { email, password })
      .then((response) => response.data);
  },
  singIn: ({ email, password }) => {
    return instAxios
      .post('auth/signin', { email, password })
      .then((response) => response.data);
  }
};
export const getChatsApi = {
  getAllChats: () => {
    return instAxios.get('chats/allChats').then((response) => response.data);
  },
  getIdRecommendedChats: (userId) => {
    return instAxios
      .get(`chats/recommendedChats/${userId}`)
      .then((response) => response.data);
  },
  postNewChat: ({ name, link, messenger, id, interest }) => {
    return instAxios
      .post('chats/', { name, link, messenger, id, interest })
      .then((response) => response.data);
  },
  deleteChat: (id) => {
    return instAxios.delete(`chats/${id}`).then((response) => response.data);
  }
};

export const userApi = {
  getUser: (userId) => {
    return instAxios.get(`users/${userId}`).then((response) => response.data);
  },
  updateUser: (data) => {
    return instAxios.put('users/', { data }).then((response) => response.data);
  },
  getMe: () => {
    return instAxios.get('users/me').then((response) => response.data);
  },
  getAllUser: () => {
    return instAxios.get('users/').then((response) => response.data);
  }
};
export const roleInCompanyApi = {
  getRoleInCompany: () => {
    return instAxios.get('roles/').then((response) => response.data);
  }
};

export const interestApi = {
  getAllInterest: () => {
    return instAxios.get('interest').then((response) => response.data);
  },
  postNewInterest: ({ name }) => {
    return instAxios
      .post('interest/', { name })
      .then((response) => response.data);
  },
  postNewInterestForAdmin: ({ name, id, tag }) => {
    return instAxios
      .post('interest/forAdmin', { name, id, tag })
      .then((response) => response.data);
  },
  deleteInterest: (id) => {
    return instAxios.delete(`interest/${id}`).then((response) => response.data);
  }
};

export const tagApi = {
  getAllTags: () => {
    return instAxios.get('tag').then((response) => response.data);
  }
};

export const locationApi = {
  getAllLocations: () => {
    return instAxios.get('location/').then((response) => response.data);
  },
  getAllLocationsForUser: () => {
    return instAxios.get('location/forUser').then((response) => response.data);
  },
  getLocationUser: () => {
    return axios
      .get('http://ip-api.com/json')
      .then((response) => response.data.regionName);
  }
};
