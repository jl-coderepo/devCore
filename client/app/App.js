import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile/CreateProfile";

//Not sure if it's best to handle here instead of index.js
if (localStorage.length > 0 && typeof localStorage.token !== "undefined") {
  setAuthToken(localStorage.token);
}

const App = () => {
  //componentdidmount hook
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
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
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
