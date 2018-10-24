import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './containers/MainLayout/loadable';
import LoginPage from './containers/Login/loadable';


const RouteConfig = () => {
    return (
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={LoginPage} />
        </Switch>
    )
}
export default RouteConfig;