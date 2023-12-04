import React from "react";
import CategorySection from "../components/CategoryCard";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Home = () => {
  return (
    <React.Fragment>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
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
      <CategorySection />
    </React.Fragment>
  );
};

export default Home;
