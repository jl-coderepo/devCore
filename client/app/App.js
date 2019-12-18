import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
