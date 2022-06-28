import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomersAll from "../pages/customers/customer.list";
import CustomerAdd from "../pages/customers/customer.list";
import CustomerDetail from "../pages/customers/customer.list";
export default function ProductsRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/customers/listing" component={CustomersAll} />
        <Route exact path="/customers/add" component={CustomerAdd} />
        <Route exact path="/customers/detail" component={CustomerDetail} />
      </Switch>
    </Router>
  );
}
