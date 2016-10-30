/**
 * Created by julianmonono on 29/10/2016.
 */
import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Panel } from 'react-bootstrap';
import StringExtensions from './stringextensions';
import request from 'superagent';

var Dropzone = require('react-dropzone');

const title = (
    <h3>Upload your picture</h3>
);

class CallHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uploadedImage: '',
            messageToSend: ''
        };
    }

    onMessageChanged(e) {
        this.setState({
            messageToSend: e.target.value
        });
    }

    onFileUploaded(file) {
        this.setState({
            uploadedImage: file
        });
    }

    handleImageUpload(file, messageToSend, onSuccess) {
        console.log('Uploaded file: ', file);
        console.log('with message: ', messageToSend);

        var base64data = null;
        var reader = new window.FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            base64data = reader.result;
            base64data = base64data.replace('data:image/jpeg;base64,','')
            // console.log(base64data);

            let upload = request.post('https://api-keepinganappearance.azurewebsites.net/api/identify')
                .send({ "filename": StringExtensions.hashString(file.name) + '.jpg', "content": base64data })
                .set('Accept', 'application/json');

            upload.end((err, response) => {
                if (err) {
                    console.error(err);
                }

                if(response && response.ok) {
                    console.log('yay got ' + JSON.stringify(response.body));
                    onSuccess(file.name);
                }
            });
        }


    }

    onImageDropped(files) {
        var component = this;

        if (!files) {
            return;
        }

        console.log('Received files: ', files);

        // component.setState({
        //     uploadedImage: files[0]
        // });

        component.handleImageUpload(files[0], component.state.messageToSend, this.onFileUploaded.bind(component));
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
                <div>
                    {this.state.uploadedImage === '' ? null :
                        <Panel header={<h3>You called home</h3>} bsStyle="success">
                            Thank you for calling home
                        </Panel>}
                </div>
            </div>
        );
    }
};

export default CallHome;