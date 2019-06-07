import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import SignIn from './auth/SignIn';
import FeedContainer from './feed/FeedContainer';
import AddNewFeed from './feed/AddNewFeed';
import ShowArticles from './feed/ShowArticles';
import ShowArticle from './feed/ShowArticle'

const Routes = () => (
    <Switch>
        <Route exact path='/auth' component={SignIn} />
        <ProtectedRoute exact path='/feeds' component={FeedContainer} />
        <ProtectedRoute exact path='/addNewFeed' component={AddNewFeed} />
        <ProtectedRoute exact path='/feeds/:title' component={ShowArticles} />
        <ProtectedRoute exact path='/feeds/:title/:article' component={ShowArticle} />
        <ProtectedRoute component={FeedContainer} />
    </Switch>
);
  
export default Routes;
