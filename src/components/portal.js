/**
 * Created by julianmonono on 30/10/2016.
 */
import React, { Component } from 'react';
import { FormGroup, Form, ControlLabel, Col, Image } from 'react-bootstrap';

class Portal extends Component {
    render() {
        return (<div>
            <h2>Thomas' Portal</h2>
            <div>
                <div className="float-left">
                    <Image src="https://www.xing.com/image/7_c_6_41561111f_19251505_1/thomas-winter-foto.1024x1024.jpg"
                           responsive
                    width="171"
                    height="220"/>
                </div>
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

        </div>);
    }
};

export default Portal;