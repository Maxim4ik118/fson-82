import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from 'pages/HomePage';
import SearchPostsPage from 'pages/SearchPostsPage';

import { StyledNavLink } from './App.styled';
import NotFound from 'pages/NotFound';
import PostDetailsPage from 'pages/PostDetailsPage';
// import css from './App.module.css';

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-posts" element={<SearchPostsPage />} />
          <Route path="/posts/:postId" element={<PostDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};
