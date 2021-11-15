import React, { FC } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from "react-router-dom";
import { Login } from "./Components/Login";
import { Race } from "./Components/Race";
import { NoMatchFound } from "./Components/common";
import { ROUTES } from "./helpers";
import { InitialStateType } from "./types";
import { useAppSelector } from "./Store/react-redux-hook";

//Private Route Props Interface
type ProtectedRouteProps = {
  isAuthenticated: boolean;
} & RouteProps;

//Private Routes 
const PrivateRoute = ({ isAuthenticated, ...routeProps }: ProtectedRouteProps) => {
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
};

//Route to each components
const Navigation: FC = () => {
  const { LOGIN, RACE } = ROUTES; //Routes Constant
  const { login } = useAppSelector((state: InitialStateType) => state); //redux-state

  const isAuth = login.data?.token ? true : false; // Check Authentication token for private route
  return (
    <Router>
      <div className="main">
        <div className="app">
          <Switch>
            <Route path="/" exact>
              <Redirect from="/" to={LOGIN} />
            </Route>
            <Route path={LOGIN} exact>
              <Login />
            </Route>
            <PrivateRoute isAuthenticated={isAuth} path={RACE} exact>
              <Race />
            </PrivateRoute>
            <Route path="*">
              <NoMatchFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Navigation;
