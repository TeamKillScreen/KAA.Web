/**
 * Created by julianmonono on 30/10/2016.
 */
import React, { Component } from 'react';
import { FormGroup, Form, ControlLabel, Col, Image } from 'react-bootstrap';
import request from 'superagent';

class Portal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            personUrl: null,
            matchUrls: null
        };
    }

    componentDidMount() {
        var component = this;
        // Get the persons profile picture
        request
            .get('https://api-keepinganappearance.azurewebsites.net/api/mugshotofperson/ID')
            .type('application/json')
            .end(function(err, res){
                if (err) {
                    console.error(err);
                    return;
                }

                if (res && res.ok) {
                    component.setState({
                        personUrl: res.body.mugshot_url,
                        matchUrls: [
                            {
                                personUrl: 'https://www.xing.com/image/7_c_6_41561111f_19251505_1/thomas-winter-foto.1024x1024.jpg',
                                dateRecorded: '12th August 2016',
                                locationRecorded: 'Lincoln'
                            }
                        ]
                    });
                }
            });
    }

    buildPotentialMatches() {
        if (!this.state.matchUrls || this.state.matchUrls === null) {
            return (<div></div>);
        }

        var matches = this.state.matchUrls.map(function(match, index) {
            return (
                <div key={index}>
                    <div className="float-left">
                        <Image src={match.personUrl}
                               responsive
                               width="121"
                               height="170"/>
                    </div>
                    <Form className="float-left" horizontal>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={12}>
                                Date recorded: {match.dateRecorded}
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={12}>
                                Location: {match.locationRecorded}
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            );
        });

        return matches;
    }

    render() {
        return (<div>
            <h2>Thomas' Portal</h2>
            <div>
                <div className="float-left">
                    <Image src={this.state.personUrl}
                           responsive
                    width="171"
                    height="220"/>
                </div>
                <div className="spacer"></div>
                <Form className="float-left" horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={12}>
                            Thomas Winter
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={12}>
                            Went missing: 12th February 2012
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={12}>
                            Last seen in: Oxford
                        </Col>
                    </FormGroup>
                </Form>
            </div>
            <div className="clearfix"></div>
            <h3>Potential sightings</h3>
            {this.buildPotentialMatches()}
        </div>);
    }
};

export default Portal;