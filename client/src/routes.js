import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import GreenhousesPage from "./pages/GreenhousesPage/GreenhousesPage";
import TablePage from "./pages/Tables/Tables";
import AddGreenhousePage from "./pages/AddGreenhousePage";

export const useRoutes = (authenticated) => {
  if (authenticated) {
    return (
      <Switch>
        <Route exact path="/greenhouses">
          <GreenhousesPage />
        </Route>
        <Route exact path="/admin/greenhouses/create">
          <AddGreenhousePage />
        </Route>
        <Route exact path="/admin/greenhouses">
          <GreenhousesPage />
        </Route>
        <Route exact path="/tables">
          <TablePage />
        </Route>
        <Redirect to="/greenhouses" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default useRoutes;
