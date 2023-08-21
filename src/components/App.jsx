import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// import HomePage from 'pages/HomePage';
// import SearchPostsPage from 'pages/SearchPostsPage';
// import NotFound from 'pages/NotFound';
// import PostDetailsPage from 'pages/PostDetailsPage';

import { StyledNavLink } from './App.styled';
import { MutatingDots } from 'react-loader-spinner';

const HomePage = lazy(() => import('pages/HomePage'));
const SearchPostsPage = lazy(() => import('pages/SearchPostsPage'));
const NotFound = lazy(() => import('pages/NotFound'));
const PostDetailsPage = lazy(() => import('pages/PostDetailsPage'));

/*
Робота з маршрутеризацією:
1. Змінити адресний рядок браузера використовуючи компоненти NavLink або Link.
2. Підготувати маршрути(Route) з відповідними шляхами, за якими Роут буде спостерігати 
   і рендерити той чи інший компонент. 
 
*/

export const App = () => {
  return (
    <div>
      <header>
        <nav>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/search-posts">Search Posts</StyledNavLink>
          {/* <StyledNavLink
            to="/contact-us"
            // className={({ isActive }) => (isActive ? css.activeNavLink : '')}
          >
            Contact Us
          </StyledNavLink> */}
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
              <Route path="/" element={<HomePage />} />
              <Route path="/search-posts" element={<SearchPostsPage />} />
              <Route path="/posts/:postId/*" element={<PostDetailsPage />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};
