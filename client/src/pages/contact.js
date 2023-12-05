import React from "react";
import ContactCard from "../components/ContactCard";
import EmailCard from "../components/EmailListCard";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

const Contact = () => {
  return (
    <Container sx={{ mt: 1}}>
      <Card>
        <CardHeader
          title="Contact the Artist"
          subheader="Please reach out for commissions, inqueries or comments. I would love to know what type of work you would like to see more of or what pieces you enjoy the most."
          titleTypographyProps={{ align: "center" }}
          subheaderTypographyProps={{
            align: "center",
          }}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
          }}
        />
        <CardContent sx={{ padding: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <ContactCard />
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ mt: 1}}>
        <CardHeader
          title="Email List"
          subheader="Enter your name and email to stay up to date on Chris' latest releases and artist updates"
          titleTypographyProps={{ align: "center" }}
          subheaderTypographyProps={{
            align: "center",
          }}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
          }}
        />
        <CardContent sx={{ padding: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <EmailCard />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Contact;
