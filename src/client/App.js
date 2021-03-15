import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import Map from './Map.js';
import * as d3 from "d3";

export default class App extends Component {
  state = { places: null };

  componentDidMount() {
    // fetch('../../datasets/ne_110m_populated_places_simple.geojson')
    //   .then(res => res.json())
    //   .then(data => this.setState({ places: data.features }));
  }

  render() {
    const { places } = this.state;
    return (
      <div>
          <Map />
      </div>
    );
  }
}
