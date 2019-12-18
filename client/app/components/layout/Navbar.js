import React from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <List component='nav'>
      <ListItem component='div'>
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
      </ListItem>
    </List>
  );
};

export default Navbar;
