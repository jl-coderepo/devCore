import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  useMediaQuery,
  makeStyles
} from "@material-ui/core";
import Navbar from "./Navbar";
import Dropmenu from "./Dropmenu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Header = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  return (
    <AppBar color='primary' position='static'>
      <Toolbar>
        <div className={classes.root}>
          <Grid container={true} alignContent='center'>
            <Grid item xs={9} sm={3} md={6} lg={8} xl={9}>
              <Typography variant='h4' color='inherit'>
                Dev Core
              </Typography>
            </Grid>
            <Grid item xs={3} sm={9} md={6} lg={4} xl={3}>
              {/* {matches ? <Navbar /> : <Dropmenu />} */}
              <Navbar />
            </Grid>
          </Grid>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
