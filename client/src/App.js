import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";

const App = () => {
  return (
    <Fragment>
      <Header />
      <Landing />
    </Fragment>
  );
};

export default App;
