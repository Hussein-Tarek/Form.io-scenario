import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useLocation } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

function Navbar() {
  const location = useLocation();
  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenLang = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(anchorElLang ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElLang(null);
  };
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (language: string) => {
    const htmlElement = document.documentElement;
    setAnchorElLang(null);
    i18n.changeLanguage(language);
    htmlElement.setAttribute("lang", language);
    htmlElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  };
  const openLang = Boolean(anchorElLang);
  return (
    <AppBar sx={{ bgcolor: "white" }} style={{ zIndex: 10 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon color="primary" />
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      display: "block",
                      color: `${
                        location.pathname === "/" ? "primary" : "black"
                      }`,
                    }}
                  >
                    {t("Forms")}
                  </Button>
                </Link>
              </MenuItem>
              {/* <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/create"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      display: "block",
                      color: `${
                        location.pathname === "/create" ? "primary" : "black"
                      }`,
                    }}
                  >
                    {t("Create")}
                  </Button>
                </Link>
              </MenuItem> */}
              {/* <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/create"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      display: "block",
                      color: `${
                        location.pathname === "/create" ? "primary" : "black"
                      }`,
                    }}
                  >
                    {t("Create")}
                  </Button>
                </Link>
              </MenuItem> */}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  color: `${location.pathname === "/" ? "primary" : "black"}`,
                }}
              >
                {t("Forms")}
              </Button>
            </Link>
            {/* <Link
              to="/create2"
              style={{ textDecoration: "none", color: "#000" }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  color: `${
                    location.pathname === "/create2" ? "primary" : "black"
                  }`,
                }}
              >
                {t("Create")}
              </Button>
            </Link> */}

            <Link
              to="/wizard"
              style={{ textDecoration: "none", color: "#000" }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  color: `${
                    location.pathname === "/wizard" ? "primary" : "black"
                  }`,
                }}
              >
                {t("Create List")}
              </Button>
            </Link>
            {/* <Link
              to="/progress"
              style={{ textDecoration: "none", color: "#000" }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  color: `${
                    location.pathname === "/progress" ? "primary" : "black"
                  }`,
                }}
              >
                {t("Progress")}
              </Button>
            </Link> */}
            {/* <Link
              to="/create"
              style={{ textDecoration: "none", color: "#000" }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  color: `${
                    location.pathname === "/create" ? "primary" : "black"
                  }`,
                }}
              >
                {t("Create Form")}
              </Button>
            </Link> */}

            {/* <Link
              to="/savedraft"
              style={{ textDecoration: "none", color: "#000" }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  color: `${
                    location.pathname === "/savedraft" ? "primary" : "black"
                  }`,
                }}
              >
                Save Draft
              </Button>
            </Link> */}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Choose language">
              <IconButton onClick={handleOpenLang} sx={{ p: 0 }}>
                <LanguageIcon
                  fontSize="large"
                  sx={{ color: "#FBEEAC", mx: "10px" }}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorElLang}
              open={openLang}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleChangeLanguage("ar");
                }}
              >
                ar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleChangeLanguage("en");
                }}
              >
                en
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
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
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => ( */}
              {/* <MenuItem onClick={handleCloseUserMenu}>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  Login
                </Link>
              </MenuItem> */}
              {/* ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
