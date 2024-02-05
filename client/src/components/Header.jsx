import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import axios from '../api/axiosInstance';

import { UserCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { removeUser } from '../redux/slices/userSlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const res = await axios.get('/auth/logout');
      const data = res.data;
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      dispatch(removeUser());
      toast.success('User Logged Out Successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <header className="top-0 sticky z-50 m-0 py-2 pl-4 pr-3 bg-teal-100 shadow-sm">
      <div className=" flex flex-row justify-between ">
        <NavLink to="/">
          <div className="flex flex-row items-center">
            <Typography variant="h4" className="font-extrabold text-yellow-400">
              Snack
            </Typography>
            <Typography variant="h4" className="font-extrabold ">
              Mart
            </Typography>
          </div>
        </NavLink>
        <div className="flex flex-row items-center gap-2">
          <Link to="/cart">
            <IconButton variant="text">
              <ShoppingCartIcon className=" text-black size-8" />
            </IconButton>
          </Link>
          <Menu>
            <MenuHandler>
              {currentUser === null ? (
                <UserCircleIcon className=" text-black size-9" />
              ) : (
                <Avatar size="sm" withBorder={true} src={currentUser.avatar} />
              )}
            </MenuHandler>

            {currentUser ? (
              <MenuList>
                {currentUser.role === 'admin' ? (
                  <Link to="/admin">
                    <MenuItem>Dashboard</MenuItem>
                  </Link>
                ) : null}
                <Link to="/profile">
                  <MenuItem>My Profile</MenuItem>
                </Link>
                <Link to="/orders">
                  <MenuItem>Orders</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout} className=" text-red-400">
                  Log Out
                </MenuItem>
              </MenuList>
            ) : (
              <MenuList>
                <Link to="/login">
                  <MenuItem>Log In</MenuItem>
                </Link>
                <Link to="/signup">
                  <MenuItem>Sign Up</MenuItem>
                </Link>
              </MenuList>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}
