import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import App from './containers/MainLayout/loadable';
import LoginPage from './containers/Login/loadable';


const RouteConfig = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={App} />
            <Route exact path="/login" component={LoginPage} />
        </Switch>
    )
}

const PrivateRoute = ({ component: Component, ...rest }) =>{
    const token = localStorage.getItem('app_token');
    return (
    <Route {...rest} render={(props) => (
        token ? <Component {...props} /> : <Redirect to='/login' />
    )} />)
};

export default RouteConfig;