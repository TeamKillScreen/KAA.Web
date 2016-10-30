import React, { Component } from 'react';
import './App.css';
import { Grid, Navbar } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
        <div>
          <Navbar inverse fixedTop>
            <Grid>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">Keeping An Appearance</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
            </Grid>
          </Navbar>
          <div className="App">
              {this.props.children}
          </div>
        </div>
    );
  }
}

export default App;
