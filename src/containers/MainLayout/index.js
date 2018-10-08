import React from 'react';
import HomePage from '../Home/loadable';
import { Switch, Route } from 'react-router-dom';

const App = () => (
    <section>
        <Switch>
            <Route exact path="/" component={HomePage} />
        </Switch>
    </section>

);
export default App;