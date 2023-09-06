import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';
import { lazy } from 'react';

const HomePage = lazy(() => import('pages/HomePage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));

export const HOME_ROUTE = '/';
export const CONTACTS_ROUTE = '/contacts';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';

export const appRoutes = [
  {
    path: HOME_ROUTE,
    element: <HomePage />,
  },
  {
    path: CONTACTS_ROUTE,
    element: (
      <PrivateRoute>
        <ContactsPage />
      </PrivateRoute>
    ),
  },
  {
    path: LOGIN_ROUTE,
    element: (
      <RestrictedRoute redirectTo={CONTACTS_ROUTE}>
        <LoginPage />
      </RestrictedRoute>
    ),
  },
  {
    path: REGISTER_ROUTE,
    element: (
      <RestrictedRoute redirectTo={CONTACTS_ROUTE}>
        <RegisterPage />
      </RestrictedRoute>
    ),
  },
];
