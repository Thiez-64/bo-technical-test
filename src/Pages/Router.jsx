import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from '../Layout';
import MENU_ENTRIES from '../menuConfig';
import { MODULES } from '../models/User/User.constants';

import ForgotPassword from './ForgotPassword';
import NewPassword from './NewPassword';
import NoPage from './NoPage';
import Login from './Login';
import NotAuthorized from './NotAuthorized';
import Health from './Health';

import Session from '../utils/Session';

const AuthRoute = ({ entry: { path, component, requiredRoles, subItems } }) => {
  const isUserLogged = Session.user.isLogged();
  const hasRequiredRoles = Session.user.hasRoles(requiredRoles || []);
  const hasWarrenModule = Session.user.hasModules([MODULES.WARREN]);
  if (!isUserLogged) {
    return <Redirect to="/login" />;
  }
  if (hasRequiredRoles && hasWarrenModule) {
    return (
      <>
        <Route exact path={path} component={component} />
        {!!subItems &&
          subItems.map((subItem, i) => (
            <Route
              key={`${path}${subItem.path}${i}`}
              exact
              path={`${path}${subItem.path}`}
              component={subItem.component}
            />
          ))}
      </>
    );
  }
  return <Route exact path={path} component={NotAuthorized} />;
};

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" key="/" component={() => <Redirect to="/login" />} />
        <Route exact path="/login" key="/login" component={() => <Login />} />
        <Route exact path="/health" key="/health" component={() => <Health />} />
        <Route
          exact
          path="/forgotPassword"
          key="/forgotPassword"
          component={() => <ForgotPassword />}
        />
        <Route
          exact
          path="/reset-password"
          key="/reset-password"
          component={() => <NewPassword />}
        />
        <Route exact path="/404" key="/404" component={() => <NoPage />} />

        <Layout>
          {MENU_ENTRIES.map((entry, index) => {
            const { path } = entry;
            return <AuthRoute entry={entry} key={`${path}${index}`} index={index} />;
          })}
        </Layout>
        {/* to be updated when we'll get user auth */}
        <Route path="*" component={() => <Redirect to="/404" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
