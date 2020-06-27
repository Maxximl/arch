import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import AuthPage from "./pages/AuthPage";
import QuizPage from './pages/QuizPage';
import QuizCreatePage from './pages/QuizCreatePage';
import GreenhousesPage from "./pages/GreenhousesPage/GreenhousesPage";
import TablePage from "./pages/Tables/Tables";



export const useRoutes = (authenticated) => {
  if (authenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
            <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route exact path="/quizes">
          <QuizPage />
        </Route>
        <Route exact path="/quizes/create">
          <QuizCreatePage />
        </Route> 
        <Route exact path="/greenhouses">
          <GreenhousesPage />
        </Route>
        <Route exact path="/tables">
          <TablePage />
        </Route> 
        <Redirect to="/create" />
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
