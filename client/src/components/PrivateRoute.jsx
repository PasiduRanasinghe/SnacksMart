import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';

export default function PrivateRoute({ role }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get('/auth/authenticate');
        const data = res.data;

        if (data.success === false) {
          setUserRole('error');
          toast.error(data.message);
          return;
        }

        setUserRole(data.role);
      } catch (error) {
        setUserRole('error');
        toast.error(error.message);
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
  console.log(userRole);
  if (role && userRole != 'error') {
    return userRole === role ? <Outlet /> : <Navigate to="/unauthorized" />;
  } else if (userRole === 'user') {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

PrivateRoute.propTypes = {
  role: PropTypes.string,
};
