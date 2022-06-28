import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductList from "../pages/products/product.list";
import ProductAdd from "../pages/products/product.add";
import ProductDetail from "../pages/products/product.detail";
export default function ProductsRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/products/listing" component={ProductList} />
        <Route exact path="/products/add" component={ProductAdd} />
        <Route exact path="/products/detail" component={ProductDetail} />
      </Switch>
    </Router>
  );
}
