import { Typography } from '@material-tailwind/react';

export default function Footer() {
  return (
    <footer className="flex w-full flex-row mt-2 p-4 md:justify-between">
      <Typography color="blue-gray" className="font-normal">
        &copy; 2023 SnackMart Restaurant
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </Typography>
        </li>

        <li>
          <Typography
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}
