import React, { Fragment } from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signout } from "../../actions/auth";

const Navbar = ({ auth: { isAuth, loading }, signout }) => {
  const authLinks = (
    <Fragment>
      <ListItemText inset>
        <Typography color='inherit' variant='inherit'>
          Developers
        </Typography>
      </ListItemText>

      <ListItemText inset>
        <Typography color='inherit' variant='inherit'>
          <Link onClick={signout} to='/' className='react-link'>
            Sign Out
          </Link>
        </Typography>
      </ListItemText>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <ListItemText inset>
        <Typography color='inherit' variant='inherit'>
          Developers
        </Typography>
      </ListItemText>

      <ListItemText inset>
        <Typography color='inherit' variant='inherit'>
          <Link to='signin' className='react-link'>
            Sign In
          </Link>
        </Typography>
      </ListItemText>

      <ListItemText inset>
        <Typography color='inherit' variant='inherit'>
          <Link to='signup' className='react-link'>
            Sign Up
          </Link>
        </Typography>
      </ListItemText>
    </Fragment>
  );

  return (
    <List component='nav'>
      <ListItem component='div'>
        {!loading && <Fragment>{isAuth ? authLinks : guestLinks}</Fragment>}
      </ListItem>
    </List>
  );
};

Navbar.propTypes = {
  signout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signout })(Navbar);
