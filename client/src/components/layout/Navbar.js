import React from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

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
            Sign In
          </Typography>
        </ListItemText>

        <ListItemText inset>
          <Typography color='inherit' variant='inherit'>
            Sign Up
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default Navbar;
