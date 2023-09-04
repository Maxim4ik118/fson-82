import { Suspense, lazy, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { MutatingDots } from 'react-loader-spinner';

import {
  CONTACTS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  appRoutes,
} from 'constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import {
  logOutUser,
  refreshUser,
  selectUserAuthentication,
  selectUserData,
} from 'redux/authReducer';

const NotFoundPage = lazy(() => import('pages/NotFound'));

export const App = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectUserAuthentication);
  const userData = useSelector(selectUserData);

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch])

  return (
    <div>
      <p>Мій олюблений Реакт😂</p>
      <header>
        <nav className="nav">
          <NavLink to={HOME_ROUTE}>Home</NavLink>

          {authenticated ? (
            <>
              <NavLink to={CONTACTS_ROUTE}>Phonebook</NavLink>
              <span>Hello, {userData.name}</span>
              <button onClick={handleLogOut}>Log Out</button>
            </>
          ) : (
            <>
              <NavLink to={LOGIN_ROUTE}>Login</NavLink>
              <NavLink to={REGISTER_ROUTE}>Register</NavLink>
            </>
          )}
        </nav>
      </header>
      <main>
        <Suspense
          fallback={
            <MutatingDots
              height="100"
              width="100"
              color="#5800a5"
              secondaryColor="#e08e00"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          }
        >
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};
