import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Header = () => {
    return(
<Container
component="main"
sx={{ pt: 1, pb: 4 }}
>
<Typography
  component="h1"
  variant="h2"
  align="center"
  color="text.primary"
  gutterBottom
>
  Chris Verges
</Typography>
<Typography
  variant="h5"
  align="center"
  color="text.secondary"
  component="p"
>
  Mixed Media Artist | Phoenix, AZ
</Typography>
</Container>
    );
};

export default Header;
