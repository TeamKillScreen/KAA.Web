/**
 * Created by julianmonono on 29/10/2016.
 */
import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import About from './components/about';
import CallHome from './components/callhome';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App}/>
        <Route path="/about" component={About}/>
        <Route path="/callhome" component={CallHome}/>
    </Router>
);

export default Routes;