import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function StickyFooter() {
  return (
    <Typography variant="body2" color="text.secondary">
      <Link color="inherit" href="https://www.instagram.com/chris_verges/?hl=en">
        Chris Verges Instagram
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}