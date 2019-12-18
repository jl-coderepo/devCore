import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Header />
        <Route exact path='/' component={Landing} />
        <Switch>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
