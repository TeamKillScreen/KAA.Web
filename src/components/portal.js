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
            person: {
                personUrl: null,
                name: null,
                missingDate: null
            },
            matchUrls: null
        };
    }

    componentDidMount() {
        var component = this;
        var requestedPerson = component.props.params.personId || '';

        // Get the personal data based on retrieved person ID
        request
            .get('https://api-keepinganappearance.azurewebsites.net/api/missingpersons/' + requestedPerson)
            .type('application/json')
            .end(function(err, res){
                if (err) {
                    console.error(err);
                    return;
                }

                if (res && res.ok) {
                    var existingPerson = component.state.person;
                    var updatedProperties = {
                        name: res.body.Forenames + ' ' + res.body.Surname,
                        missingDate: res.body.Date_Went_Missing
                    };
                    component.setState(Object.assign(existingPerson, updatedProperties));
                }
            });

        // Get the person based on retrieved ID
        request
            .get('https://api-keepinganappearance.azurewebsites.net/api/mugshotofperson/' + requestedPerson)
            .type('application/json')
            .end(function(err, res){
                if (err) {
                    console.error(err);
                    return;
                }

                if (res && res.ok) {
                    var existingPerson = component.state.person;
                    var updatedProperties = { personUrl: res.body.mugshot_url };
                    component.setState(Object.assign(existingPerson, updatedProperties));
                }
            });

        // Now get persons matched photos
        request
            .get('https://api-keepinganappearance.azurewebsites.net/api/matchingphotosofperson/' + requestedPerson)
            .type('application/json')
            .end(function (err, res) {
                if (err) {
                    console.error(err);
                    return;
                }

                if (res && res.ok) {
                    var mappedResults = res.body.photos.map(function(photo) {
                        return {
                            personUrl: photo.photo_url,
                            latLocation: photo.location.lat,
                            longLocation: photo.location.long,
                            dateRecorded: '30th October 2016'
                        };
                    });

                    component.setState({
                        matchUrls: mappedResults
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
                <div key={index} className="clearfix">
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
                                Location: Lat: {match.latLocation} Long: {match.longLocation}
                                <img src="https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&key=AIzaSyDtzcN3Ro9r8CSeCFdoqgQ3Fw2AoKyjlas"
                                     alt="Montana" width="171" height="220" />
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            );
        });

        return matches;
    }

    buildPersonalData() {
        var component = this;

        if (!component.state.person || component.state.person === null) {
            return (<div></div>);
        }

        console.log(component.state);

        return (<div>
            <h2>{component.state.person.name}'s Portal</h2>
            <div>
                <div className="float-left">
                    <Image src={component.state.person.personUrl}
                           responsive
                           width="171"
                           height="220"/>
                </div>
                <div className="spacer"></div>
                <Form className="float-left" horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={12}>
                            Went missing: {component.state.person.missingDate}
                        </Col>
                    </FormGroup>
                </Form>
            </div>
            <div className="clearfix"></div>
            <h3>Potential sightings</h3>
            {component.buildPotentialMatches()}
        </div>);
    }

    render() {
        return (this.buildPersonalData());
    }
};

export default Portal;