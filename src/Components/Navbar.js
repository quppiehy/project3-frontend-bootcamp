import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link, useNavigate } from "react-router-dom";
import Saja from "../images/saja.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "../Components/UserContext";

const pages = ["Categories", "Deals", "Delivery"];
const settings = ["Profile", "Chat", "Past Orders", "Logout"];
const settingsNotUser = ["Login/Signup"];

function Navbar() {
  const { logout, loginWithRedirect } = useAuth0();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { currUser, setCurrUser } = useUserContext();
  const navigate = useNavigate();

  // to retrieve currUser from local storage and to set it for context
  useEffect(() => {
    console.log(currUser);
    if (currUser === null) {
      const localAccess = JSON.parse(localStorage.getItem("currUser"));
      console.log(localAccess);
      setCurrUser(localAccess);
    }
  }, [currUser]);

  // checks if user is logged in or not to display user menu
  const login = currUser !== null ? true : false;

  // handle user menu click
  const handleUserMenu = (page) => {
    if (page === "Logout") {
      logout({ returnTo: process.env.REACT_APP_REDIRECT_URI });
      setAnchorElUser(null);
      setCurrUser(null);
      localStorage.removeItem("Token");
      localStorage.removeItem("currUser");
    } else if (page === "Login/Signup") {
      setAnchorElUser(null);
      loginWithRedirect({
        authorizationParams: {
          redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
        },
      });
    } else if (page === "Past Orders") {
      navigate("pastorders");
    } else {
      navigate(`${page.toLowerCase()}`);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setAnchorElNav(event.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link to={page.toLowerCase()} key={page}>
                  <MenuItem key={page} onClick={() => setAnchorElNav(null)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.toLowerCase()} key={page}>
                <Button
                  key={page}
                  onClick={() => setAnchorElNav(null)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
            <Box
              sx={{ width: "70px", marginLeft: "23.5vw" }}
              className="saja-logo"
            >
              <Link to="/">
                <img src={Saja} alt="Saja logo" />
              </Link>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0, gap: "20px", display: "flex" }}>
            <Link to="cart">
              <Tooltip title="Cart">
                <IconButton sx={{ p: 0 }}>
                  <LocalMallIcon sx={{ color: "white" }} alt="Cart" />
                </IconButton>
              </Tooltip>
            </Link>

            <Link to="search">
              <Tooltip title="Search">
                <IconButton sx={{ p: 0 }}>
                  <SearchIcon sx={{ color: "white" }} alt="Search" />
                </IconButton>
              </Tooltip>
            </Link>

            {/* <Link to="profile"> */}
            <Tooltip title="Profile">
              <IconButton
                onClick={(event) => setAnchorElUser(event.currentTarget)}
                sx={{ p: 0 }}
              >
                <PersonOutlineIcon sx={{ color: "white" }} alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            {/* </Link> */}
            <Menu
              sx={{ mt: "45px" }}
              id="user-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              {login
                ? settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))
                : settingsNotUser.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
