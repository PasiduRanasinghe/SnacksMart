import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className=" flex  flex-col justify-center items-center w-screen h-96">
      <Typography variant="h3" color="red">
        401 - Unauthorized
      </Typography>
      <Typography variant="h6" color="red" className="my-4">
        You are not authorized to access this page
      </Typography>
      <Link to="/">
        <Button variant="outlined" color="blue">
          RETURN Home
        </Button>
      </Link>
    </div>
  );
}
