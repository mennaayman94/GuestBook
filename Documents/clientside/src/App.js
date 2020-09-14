import React from "react";
import NonFixedNavbarExample from "./components/NonFixedNavbarExample";
import "./App.css";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import MessageTable from "./components/MessageTable";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//JSX
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/message" component={MessageTable} />
      </Switch>
    </Router>
  );
};

export default App;
