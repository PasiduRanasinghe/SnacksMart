import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from '@material-tailwind/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const pages = ['Shop', 'About', 'Contact'];
const settings = ['Profile', 'Orders', 'Logout'];

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="top-0 flex sticky z-50 p-0">
      <Navbar className="sticky m-auto bg-blue-gray-200 p-3">
        <div className=" flex flex-row justify-between ">
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
          <Menu>
            <MenuHandler>
              <Avatar withBorder={true} src={currentUser.avatar} />
            </MenuHandler>
            <MenuList className="p-1 w-24 justify-end">
              <Link to="/profile">
                <MenuItem>My Profile</MenuItem>
              </Link>

              <MenuItem>Orders</MenuItem>
              <MenuItem>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Navbar>
    </div>
  );
}
