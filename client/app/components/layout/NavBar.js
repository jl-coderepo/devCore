import React, { Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleIcon from "@material-ui/icons/People";
import { Tooltip } from "@material-ui/core/";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signout } from "../../actions/auth";
import { toggleTheme } from "../../actions/themes";
import { Switch, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

function NavBar({ auth: { isAuth, loading }, light, signout, toggleTheme }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignOut = e => {
    e.preventDefault();
    signout();
    handleMenuClose();
    return <Redirect to='/' />;
  };

  const menuId = "primary-search-account-menu";
  const renderGuestMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link
          to='/signup'
          className='react-link'
          color='inherit'
          underline='none'
        >
          Sign Up
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link
          to='/signin'
          className='react-link'
          color='inherit'
          underline='none'
        >
          Sign In
        </Link>
      </MenuItem>
    </Menu>
  );
  //BUG! not quite sure how to fix yet,
  //  seems like signout renders guest
  //  menu and thinks it clicked on first one
  const renderAuthMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link
          to='/dashboard'
          className='react-link'
          color='inherit'
          underline='none'
        >
          Dashboard
        </Link>
      </MenuItem>
      <MenuItem
        onClick={e => {
          handleSignOut(e);
        }}
      >
        <Link to='/' className='react-link' color='inherit' underline='none'>
          Sign Out
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='get profile of developers' color='inherit'>
          <PeopleIcon />
        </IconButton>
        <Link
          to='/profiles'
          className='react-link'
          color='inherit'
          underline='none'
        >
          Developers
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>User</p>
      </MenuItem>
      <MenuItem>
        <Switch
          checked={light}
          onChange={toggleTheme}
          color='default'
          size='small'
          style={{ paddingTop: "3px" }}
        />
        <p>{light ? "Dark" : "Light"}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            <Link
              to='/'
              className='react-link'
              color='inherit'
              underline='none'
            >
              Dev Core
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip title='Developers'>
              <Link
                to='/profiles'
                className='react-link'
                color='inherit'
                underline='none'
              >
                <IconButton
                  aria-label='get profile of developers'
                  color='inherit'
                >
                  <PeopleIcon />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title='User'>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Tooltip title='Toggle between light and dark mode'>
              <Grid container justify='center' direction='column'>
                <Switch
                  checked={light}
                  onChange={toggleTheme}
                  color='default'
                  size='small'
                  style={{ paddingTop: "3px" }}
                />
              </Grid>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {!loading && (
        <Fragment>{isAuth ? renderAuthMenu : renderGuestMenu}</Fragment>
      )}
    </div>
  );
}

NavBar.propTypes = {
  signout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  light: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  light: state.themes.light
});

export default connect(mapStateToProps, { signout, toggleTheme })(NavBar);
