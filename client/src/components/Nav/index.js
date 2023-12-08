import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Cart from "../Cart";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleTabClick = (event, newValue) => {
    setValue(newValue);
  
    // Check if the clicked tab is "Shop" before toggling the popover
    if (newValue === 3) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };
  

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { loading, error, data } = useQuery(QUERY_CATEGORIES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("Error fetching categories", error);
    return <p>Error: {error.message}</p>;
  }

  const categories = data.categories;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingX: 2,
        mb: 1,
        alignItems: "center",
        borderBottom: 1, borderColor: "divider"
      }}
    >
<Box
  sx={{
    width: "100%",
    display: "flex",
    justifyContent: "center",
  }}
>
  <Tabs
    value={value}
    onChange={(event, newValue) => handleTabClick(event, newValue)}
    aria-label="basic tabs example"
    sx={{
      "& .MuiTabs-indicator": { display: "none" },
      width: "100%",
      maxWidth: "600px", // Set a maximum width if needed
    }}
  >
    <Tab
      label="Home"
      component={Link}
      to="/"
      onClick={(event) => handleTabClick(event, 0)}
      sx={{ color: "black", flex: 1 }}
      {...a11yProps(0)}
    />
    <Tab
      label="About"
      component={Link}
      to="/about"
      onClick={(event) => handleTabClick(event, 1)}
      sx={{ color: "black", flex: 1 }}
      {...a11yProps(1)}
    />
    <Tab
      label="Contact"
      component={Link}
      to="/contact"
      onClick={(event) => handleTabClick(event, 2)}
      sx={{ color: "black", flex: 1 }}
      {...a11yProps(2)}
    />
    <Tab
      label="Shop"
      aria-owns={open ? "simple-popover" : undefined}
      aria-haspopup="true"
      onClick={(event) => handleTabClick(event, 3)}
      sx={{ color: "black", flex: 1 }}
      {...a11yProps(3)}
    />
  </Tabs>
</Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <List>
          {categories.map((category) => (
            <ListItem key={category._id}>
              <Link to={`/category/${category._id}`} style={{ color: "black" }}>
                {category.categoryName}
              </Link>
            </ListItem>
          ))}
        </List>
      </Popover>
      <Cart />
    </Box>
  );
}