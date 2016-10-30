/**
 * Created by julianmonono on 30/10/2016.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Jumbotron, Grid } from 'react-bootstrap';

class Home extends Component {
    render() {
        return (
            <Jumbotron>
                <Grid>
                    <h1>Welcome to Crowd Found</h1>
                    <p>
                        <Link className="btn btn-info btn-lg" role="button"
                              to="/callhome">
                            Call home
                        </Link>
                        <span className="spacer" />
                        <Link className="btn btn-info btn-lg" role="button"
                              to="/portal/1234">
                            My missing person
                        </Link>
                    </p>
                </Grid>
            </Jumbotron>
        );
    }
};

export default Home;