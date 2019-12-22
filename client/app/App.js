import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
// import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import AddExperience from "./components/profile/AddExperience";
import AddEducation from "./components/profile/AddEducation";
import {
  ThemeProvider,
  CssBaseline,
  makeStyles,
  createMuiTheme,
  darkBaseTheme
} from "@material-ui/core";
import { darkTheme, lightTheme } from "./themes/themes";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Not sure if it's best to handle here instead of index.js
if (localStorage.length > 0 && typeof localStorage.token !== "undefined") {
  setAuthToken(localStorage.token);
}

const App = ({ light }) => {
  //componentdidmount hook

  useEffect(() => {
    console.log("is my suspicion correct?");
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Fragment>
        <ThemeProvider theme={light ? lightTheme : darkTheme}>
          <CssBaseline />
          <NavBar />
          <Route exact path='/' component={Landing} />
          <Alert />
          <Switch>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signin' component={Signin} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute
              exact
              path='/createprofile'
              component={CreateProfile}
            />
            <PrivateRoute exact path='/editprofile' component={EditProfile} />
            <PrivateRoute
              exact
              path='/addexperience'
              component={AddExperience}
            />
            <PrivateRoute exact path='/addeducation' component={AddEducation} />
          </Switch>
        </ThemeProvider>
      </Fragment>
    </Router>
  );
};

App.propTypes = {
  light: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  light: state.themes.light
});

export default connect(mapStateToProps)(App);
