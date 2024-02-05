import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="flex w-full flex-row mt-2 p-4 justify-between">
      <Typography color="blue-gray" className="font-normal">
        &copy; 2023 SnackMart Restaurant
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Link to="/about">
            <Typography
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </Link>
        </li>

        <li>
          <Link to="/contact-us">
            <Typography
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
