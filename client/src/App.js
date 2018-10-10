import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import ZoosList from './components/ZoosList.js'


class App extends Component {
  state = {
    zoos: [],
    name: ''
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3300/api/zoos`)
      .then(response => {
        // console.log(response);
        this.setState({ zoos: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>
            <ZoosList  zoos={this.state.zoos} />
          </div>
        
      </div>
    );
  }
}

export default App;
