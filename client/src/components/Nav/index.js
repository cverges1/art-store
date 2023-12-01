import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              to="/"
              sx={{ my: 1, mx: 1.5 }}
            >
              HOME
            </Link>
            <Link
              variant="button"
              color="text.primary"
              to="/about"
              sx={{ my: 1, mx: 1.5 }}
            >
              ABOUT
            </Link>
            <Link
              variant="button"
              color="text.primary"
              to="/contact"
              sx={{ my: 1, mx: 1.5 }}
            >
              CONTACT
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
