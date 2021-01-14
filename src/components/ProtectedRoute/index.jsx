import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props) => {
        if (isAuth) {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <Component {...rest} {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};
export default ProtectedRoute;

ProtectedRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired
};
