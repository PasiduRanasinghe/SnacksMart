import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {
  Avatar,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from '@material-tailwind/react';

import { UserCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="top-0 flex sticky z-50 p-0">
      <Navbar className="sticky m-auto bg-blue-gray-200 p-3">
        <div className=" flex flex-row justify-between ">
          <NavLink to="/">
            <div className="flex flex-row items-center">
              <Typography
                variant="h4"
                className=" font-extrabold text-yellow-300"
              >
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
                  <Avatar
                    size="sm"
                    withBorder={true}
                    src={currentUser.avatar}
                  />
                )}
              </MenuHandler>
              <MenuList>
                <Link to="/profile">
                  <MenuItem>My Profile</MenuItem>
                </Link>
                <Link to="/orders">
                  <MenuItem>Orders</MenuItem>
                </Link>
                <MenuItem className=" text-red-400">Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
