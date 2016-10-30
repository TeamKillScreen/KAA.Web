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
                    <h1>Welcome to Keeping An Appearance</h1>
                    <p>
                        <Link className="btn btn-info btn-lg" role="button"
                              to="/callhome" params={{id: this.props.params.id}}>
                            Call home
                        </Link>
                        <span className="spacer" />
                        <Link className="btn btn-info btn-lg" role="button"
                              to="/portal" params={{id: this.props.params.id}}>
                            My missing person
                        </Link>
                    </p>
                </Grid>
            </Jumbotron>
        );
    }
};

export default Home;