import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectUserAuthentication } from 'redux/authReducer';

import { HOME_ROUTE } from 'constants/routes';

export const RestrictedRoute = ({ children, redirectTo = HOME_ROUTE }) => {
  const authenticated = useSelector(selectUserAuthentication);
  return authenticated ? <Navigate to={redirectTo} replace /> : children;
};
