import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';

import { removeUser } from '../redux/slices/userSlice';

export default function PrivateRoute({ role }) {
  const [userRole, setUserRole] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get('/auth/authenticate');
        const data = res.data;
        setUserRole(data.role);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setUserRole('error');
          dispatch(removeUser());
          console.log(error.response);
          toast.error(error.response.statusText);
          return;
        } else {
          toast.error(error.message);
        }
      }
    };

    fetchProduct();
  });

  if (userRole === null) {
    // Loading state,
    return (
      <div className="flex h-screen justify-center items-center ">
        <Spinner className=" size-28" />
      </div>
    );
  }
  if (role && userRole != 'error') {
    return userRole === role ? <Outlet /> : <Navigate to="/unauthorized" />;
  } else if (userRole === 'user' || userRole === 'admin') {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

PrivateRoute.propTypes = {
  role: PropTypes.string,
};
