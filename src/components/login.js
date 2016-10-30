/**
 * Created by julianmonono on 30/10/2016.
 */
import React, { Component } from 'react';
import { Panel, FormGroup, FormControl, Form, Button, ControlLabel } from 'react-bootstrap';
import { hashHistory } from 'react-router';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            showError: false
        };
    }

    onUsernameChanged(e) {
        if (!e || !e.target) {
            return;
        }

        this.setState({
            username: e.target.value
        });
    }

    onPasswordChanged(e) {
        if (!e || !e.target) {
            return;
        }

        this.setState({
            password: e.target.value
        });
    }

    handleSubmit() {
        var currentUsername = this.state.username;
        var password = this.state.password;

        console.log('Attempting sign in with ', currentUsername);
        console.log('password ', password);

        if (currentUsername && password && (currentUsername === password)) {
            hashHistory.push('/portal');
        }
        else {
            this.setState({
                showError: true
            });
        }
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <Panel header={<h3>Login</h3>} bsStyle="primary">
                    <Form>
                        {!this.state.showError ? null :
                            <Panel bsStyle="danger">
                                Username and / or password not recognised
                            </Panel>}
                        <FormGroup>
                            <ControlLabel>Please enter your username</ControlLabel>
                            <FormControl type="text" placeholder="Username" onChange={this.onUsernameChanged.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" placeholder="Password" onChange={this.onPasswordChanged.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" bsStyle="primary" bsSize="large" onClick={this.handleSubmit.bind(this)}>Login</Button>
                        </FormGroup>
                    </Form>
                </Panel>
            </div>
        );
    }
};

export default Login