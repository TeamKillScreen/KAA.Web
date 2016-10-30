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
                              to="/about">
                            About
                        </Link>
                        <span className="spacer" />
                        <Link className="btn btn-info btn-lg" role="button"
                              to="/callhome">
                            Call home
                        </Link>
                        <span className="spacer" />
                        <a className="btn btn-info btn-lg" role="button"
                              href="/kiosk/kiosk.html">
                            Kiosk Mode
                        </a>
                        <span className="spacer" />
                        <Link className="btn btn-info btn-lg" role="button"
                              to="/portal/3F3A393B3B36373A333A">
                            My missing person - Craig
                        </Link>
                        <span className="spacer" />
                        <Link className="btn btn-info btn-lg" role="button"
                              to="/portal/393A3A3B3B36373A333A">
                            My missing person - Gemma
                        </Link>
                        <span className="spacer" />
                        <Link className="btn btn-info btn-lg" role="button"
                              to="/portal/3A3A3A3B3B36373A333A">
                            My missing person - Jo
                        </Link>
                        <span className="spacer" />
                        <Link className="btn btn-info btn-lg" role="button"
                              to="/portal/383A3A3B3B36373A333A">
                            My missing person - Julian
                        </Link>
                        <span className="spacer" />
                        <Link className="btn btn-info btn-lg" role="button"
                              to="/portal/403A393B3B36373A333A">
                            My missing person - Richard
                        </Link>
                        <span className="spacer" />
                        <Link className="btn btn-info btn-lg" role="button"
                              to="/portal/413A393B3B36373A333A">
                            My missing person - Yak
                        </Link>
                    </p>
                </Grid>
            </Jumbotron>
        );
    }
};

export default Home;
