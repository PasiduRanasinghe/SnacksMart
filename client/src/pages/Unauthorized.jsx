import { Typography } from '@material-tailwind/react';
import React from 'react';

export default function Unauthorized() {
  return (
    <div className=" w-full h-full">
      <Typography variant="h3" color="red">
        Unauthorized
      </Typography>
    </div>
  );
}
