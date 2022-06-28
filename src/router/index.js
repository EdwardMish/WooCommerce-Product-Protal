import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/login";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard/dashboard";
import Profile from "../pages/account/profile";
import Reset from "../pages/account/reset_password";
import Header from "../components/header";
import Auth from "../hoc/auth";
import ForgotPassword from "../pages/account/forgotPassword";
import ResetPassword from "../pages/account/reset_password";

import ProductsRouter from "./products";
import CustomersRouter from "./customers";

export default function App() {
  return (
    <Router>
      <div className="px-0">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/reset" component={Auth(Reset, false)} />
          <Route exact path="/profile" component={Auth(Profile, true)} />
          <Route exact path="/dashboard" component={Auth(Dashboard, true)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route
            exact
            path="/forgot-password"
            component={Auth(ForgotPassword, false)}
          />
          <Route
            path="/reset-password"
            component={Auth(ResetPassword, false)}
          />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/logout" component={Auth(Login, true)} />
          <Route path="/products" component={Auth(ProductsRouter, true)} />
          <Route path="/customers" component={Auth(CustomersRouter, true)} />
        </Switch>
      </div>

    </Router>
  );
}
