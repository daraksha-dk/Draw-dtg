import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import AlertCard from "../layout/Alert";
import { Col } from "react-bootstrap";
import PrivateRoute from "./PrivateRoute";
import ArtBoard from "../ArtBoard/artboard";

const Routes = () => {
  return (
    <section className="container">
      <Col className="text-center d-flex justify-content-around">
        <AlertCard />
      </Col>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/artboard" component={ArtBoard} />
      </Switch>
    </section>
  );
};

export default Routes;
