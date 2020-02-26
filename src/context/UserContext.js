import { createContext, useContext } from 'react';

const UserContext = createContext({});

const persistedUser = () => {
  const localUser = localStorage.getItem('user');
  const localSchool = localStorage.getItem('school');
  const localToken = localStorage.getItem('token');

  let userData = {
    user: null,
    school: null,
    token: null,
  };

  if (localUser) {
    userData = { user: JSON.parse(localUser) };
  }

  if (localSchool) {
    userData = { ...userData, school: JSON.parse(localSchool) };
  }

  if (localToken) {
    userData = { ...userData, token: localToken };
  }

  return userData;
};

const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;
const useUserContext = () => useContext(UserContext);

export { persistedUser, UserProvider, UserConsumer, useUserContext };
export default UserContext;
