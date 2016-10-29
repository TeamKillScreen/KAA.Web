/**
 * Created by julianmonono on 29/10/2016.
 */
import React, { Component } from 'react';
import { Form, FormGroup, Button, Col, ControlLabel, FormControl, Panel } from 'react-bootstrap';
var Dropzone = require('react-dropzone');

const title = (
    <h3>Upload your message</h3>
);

const onImageDropped = function(files) {
    console.log('Received files: ', files);
};

const formInstance = (
    <Form horizontal>
        <FormGroup controlId="imageUploader">
            <Col sm={6}>
                <Dropzone multiple={false} accept="image/*" onDrop={onImageDropped}>
                    <div>Drop your image here</div>
                </Dropzone>
            </Col>
        </FormGroup>
        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                Your message
            </Col>
            <Col sm={10}>
                <FormControl type="text" placeholder="Your message"/>
            </Col>
        </FormGroup>
        <FormGroup>
            <Col sm={10}>
                <Button type="submit">
                    Call home
                </Button>
            </Col>
        </FormGroup>
    </Form>
);

class CallHome extends Component {

    constructor(props) {
        super(props);
    }

    onImageDropped(files) {
        console.log('Received files: ', files);
    };

    render() {
        return (
            <div>
                <h1>Call Home</h1>
                <p>Upload a picture of yourself with a message to let your loved ones know you're OK</p>
                <Panel header={title} bsStyle="primary">
                    {formInstance}
                </Panel>
            </div>
        );
    }
};

export default CallHome;