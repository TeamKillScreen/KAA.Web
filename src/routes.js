/**
 * Created by julianmonono on 29/10/2016.
 */
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './App';
import About from './components/about';
import Home from './components/home';
import CallHome from './components/callhome';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About}/>
            <Route path="callhome" component={CallHome}/>
        </Route>
    </Router>
);

export default Routes;