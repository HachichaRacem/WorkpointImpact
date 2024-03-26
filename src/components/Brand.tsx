import React from 'react';
import Logo from './Logo';
import { Stack } from 'rsuite';

const Brand = props => {
  return (
    <Stack className="brand" {...props}>
      <Logo />
    </Stack>
  );
};

export default Brand;
