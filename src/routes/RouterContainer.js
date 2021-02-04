import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PagesCreate from '../pages/admin/pages/PagesCreate';
import PagesList from '../pages/admin/pages/PagesList';
import { NotFound } from '../pages/error/NotFound';
import LoginPage from '../pages/login/LoginPage';
import Page from '../pages/pages/Page';
import PrivateRoute from './PrivateRoute';


const RouterContainer = props => (
  <Router>
      <Switch>
          <PrivateRoute exact path={"/admin"} component={ PagesList } />
          <PrivateRoute path={"/admin/create"} component={ PagesCreate } />
          <Route exact path={"/"} component={ LoginPage } />
          <Route path={"/:page"} component={ Page } />
          <Route>
              <NotFound />
          </Route>
      </Switch>
  </Router>
)
  
export default RouterContainer;