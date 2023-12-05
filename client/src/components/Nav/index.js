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

    // Toggle the dropdown
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Fetch products using GraphQL query
  const { loading, error, data } = useQuery(QUERY_CATEGORIES);

  if (loading) {
    // Initial loading state
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
        justifyContent: "center",
        paddingX: 2, // Add padding for better spacing
        mb: 1,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleTabClick}
          aria-label="basic tabs example"
          sx={{ "& .MuiTabs-indicator": { display: "none" } }}
        >
          <Box sx={{ width: "25%" }} />
          <Link to={`/`} style={{ flex: 1 }}>
            <Tab label="Home" sx={{ color: "black" }} {...a11yProps(0)} />
          </Link>
          <Link to={`/about`} style={{ flex: 1 }}>
            <Tab label="About" sx={{ color: "black" }} {...a11yProps(1)} />
          </Link>
          <Link to={`/contact`} style={{ flex: 1 }}>
            <Tab label="Contact" sx={{ color: "black" }} {...a11yProps(2)} />
          </Link>
          <Tab
            label="Shop"
            {...a11yProps(3)}
            aria-owns={open ? "simple-popover" : undefined}
            aria-haspopup="true"
            onClick={handleTabClick}
            sx={{ flex: 1 }}
          />
          <Box sx={{ width: "25%" }} />
        </Tabs>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
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
    </Box>
  );
}
