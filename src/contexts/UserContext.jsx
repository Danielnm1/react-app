import {createContext, useState} from 'react';
import PropTypes from 'prop-types';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useLocation, useNavigate} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const postLogin = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    try {
      const userInfo = await postLogin(credentials);
      console.log('context handleLogin', userInfo);
      localStorage.setItem('token', userInfo.token);
      setUser(userInfo.user);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAutoLogin = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('token not found');
      return;
    }
    try {
      const userResult = await getUserByToken(token);
      console.log('profile user', userResult);
      setUser(userResult);
      navigate(location.pathname);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleAutoLogin, handleLogout, handleLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export {UserProvider, UserContext};
