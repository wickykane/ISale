import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../Home/loadable';
import OverviewPage from '../Overview/loadable';

const RouteConfig = () => {
    return (
        <Switch>
            <Route exact path="/" component={OverviewPage} />
            <Route exact path="/home" component={HomePage} />
        </Switch>
    )
}
export default RouteConfig;