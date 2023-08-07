import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>
        404 Not Found, maybe you want to go to the <Link to="/">HomePage</Link>
      </h1>
    </div>
  );
};

export default NotFound;
