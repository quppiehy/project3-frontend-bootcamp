import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link } from "react-router-dom";
import Saja from "../images/saja.png";
import { useAuth0 } from "@auth0/auth0-react";

const pages = ["Categories", "Deals", "Delivery"];
const settings = ["Profile", "Account", "Dashboard", "Chat", "Logout"];

function Navbar() {
  const { logout } = useAuth0();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => setAnchorElUser(null)}>
                  {/* Render the logout button with Auth0 logout functionality */}

                  {setting === "Logout" ? (
                    <Button
                      onClick={() =>
                        logout({ returnTo: process.env.REACT_APP_REDIRECT_URI })
                      }
                      color="inherit"
                    >
                      Logout
                    </Button>
                  ) : (
                    <Link to={setting.toLowerCase()} key={setting}>
                      <Typography textAlign="center">{setting}</Typography>
                    </Link>
                  )}
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
