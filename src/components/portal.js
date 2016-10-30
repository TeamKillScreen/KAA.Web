/**
 * Created by julianmonono on 30/10/2016.
 */
import React, { Component } from 'react';
import { Image, Panel } from 'react-bootstrap';
import request from 'superagent';
import moment from 'moment';

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
            var imageSource = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
                match.latLocation +
                ',' + match.longLocation +
                '&markers=' +
                match.latLocation +
                ',' + match.longLocation +
                '&zoom=15&size=400x400&key=AIzaSyDtzcN3Ro9r8CSeCFdoqgQ3Fw2AoKyjlas';

            return (
                <div key={index}>
                    <Panel header={<h3>{match.dateRecorded}</h3>}>
                        <div className="sighting-card-div">
                            <Image src={match.personUrl}

                                   width="50%"
                                   height="170"/>
                        </div>
                        {(match.latLocation === 0 && match.longLocation === 0 ? <div></div> :
                            <div className="sighting-card-div">
                                <Image src={imageSource}

                                       width="50%"
                                       height="170"/>
                            </div>)}
                    </Panel>
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

        return (<div className="panel-max-width">
            <h2>{component.state.person.name}'s Portal</h2>
            <Panel header={<h3>Missing since: {moment(component.state.person.missingDate).format('MMMM Do YYYY, h:mm a')}</h3>}
                   bsStyle="primary"
                   >
                <div className="float-left">
                    <Image src={component.state.person.personUrl}
                           responsive
                           width="100%"
                           height="220"/>
                </div>
            </Panel>
            <div>

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