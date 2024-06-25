import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../context/userContext';
import { LanguageContext } from '../../context/languageContext';
import languageConstants from '../../constants/languagesConstants';
import { AuthAPI, UsersAPI } from '../../utils/api/api';
import Session from '../../utils/Session';

import { MODULES, ROLES } from '../../models/User/User.constants';

import LoginView from './Login.view';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Version': 'v6',
};

function LoginContainer() {
  const [errorMsg, setErrorMsg] = useState(null);
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { toggleLanguage } = useContext(LanguageContext);

  const setInitialLanguage = (lang) => {
    if (!!lang && languageConstants.some((l) => l === lang)) {
      toggleLanguage(lang);
    } else {
      toggleLanguage(languageConstants[0]);
    }
  };

  const redirectUser = () => {
    Session.loadUser();
    const isAllowed =
      Session.user.hasModules([MODULES.WARREN]) && Session.user.hasRoles([ROLES.USE_NEWS]);
    const landingPage = Session.user.homepage.toString();

    if (isAllowed) {
      history.push(landingPage);
    } else {
      history.push('/login');
      setUser({});
    }
  };

  const handleSubmit = async (values) => {
    setErrorMsg(null);
    try {
      const auth = await AuthAPI.login(values);
      const headersWithToken = { ...headers, Authorization: `Bearer ${auth.accessToken}` };

      // Stockez le jeton d'accès dans la session et le stockage local
      Session.setAccessToken(auth.accessToken);

      const userMainData = await UsersAPI.fetchMe(headersWithToken);
      const userData = await UsersAPI.fetchContext(headersWithToken);
      axios.defaults.headers.common = { ...headersWithToken, 'x-account-key': userData.accountKey };
      delete userData.password;

      // Créez un nouvel utilisateur combiné et stockez-le dans la session
      const newUser = { ...userData, ...userMainData, ...auth };
      setUser(newUser);
      Session.user = newUser; // Cela appellera saveUser() automatiquement
      setInitialLanguage(userMainData?.meta?.language);
      redirectUser();
    } catch (error) {
      setErrorMsg('Connection error', error);
    }
  };

  const handleBack = () => {
    history.push('/forgotPassword');
  };

  useEffect(() => {
    if (!!user?.id && !!user?.accessToken) {
      setInitialLanguage(user?.meta?.language);
      redirectUser();
    }
  }, []);

  return (
    <div>
      <LoginView onSubmit={handleSubmit} errorMsg={errorMsg} handleBack={handleBack} />
    </div>
  );
}

export default LoginContainer;
