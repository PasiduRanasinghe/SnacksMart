import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PrivateRoute({ role }) {
  const { currentUser } = useSelector((state) => state.user);

  if (role) {
    return currentUser && currentUser.role === role ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" />
    );
  } else {
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  }
}

PrivateRoute.propTypes = {
  role: PropTypes.string,
};
