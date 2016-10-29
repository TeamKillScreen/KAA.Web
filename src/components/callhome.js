/**
 * Created by julianmonono on 29/10/2016.
 */
import React, { Component } from 'react';
import { Form, FormGroup, Button, Col, ControlLabel, FormControl, Panel } from 'react-bootstrap';
var Dropzone = require('react-dropzone');

const title = (
    <h3>Upload your picture</h3>
);

class CallHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uploadedImage: null,
            messageToSend: ''
        };
    }

    onMessageChanged(e) {
        this.setState({
            messageToSend: e.target.value
        });
    }

    handleImageUpload(file, messageToSend) {
        console.log('Uploaded file: ', file);
        console.log('with message: ', messageToSend);
    }

    onImageDropped(files) {
        var component = this;

        if (!files) {
            return;
        }

        console.log('Received files: ', files);

        component.setState({
            uploadedImage: files[0]
        });

        component.handleImageUpload(files[0], component.state.messageToSend);
    };

    getFormInstance() {
        return (<Form>
                    <FormGroup>
                        <ControlLabel>First enter your message</ControlLabel>
                        <FormControl type="text" placeholder="Your message" onChange={this.onMessageChanged.bind(this)}/>
                    </FormGroup>
                    <FormGroup controlId="imageUploader">
                        <ControlLabel>Now upload your picture</ControlLabel>
                        <Dropzone multiple={false} accept="image/*" onDrop={this.onImageDropped.bind(this)}>
                            <div>Drop your image here</div>
                        </Dropzone>
                    </FormGroup>
                </Form>);
    }

    render() {
        return (
            <div>
                <h1>Call Home</h1>
                <p>Upload a picture of yourself with a message to let your loved ones know you're OK</p>
                <Panel header={title} bsStyle="primary">
                    {this.getFormInstance()}
                </Panel>
            </div>
        );
    }
};

export default CallHome;