import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
// import Map from './Map.js';
import Map from './Map3.js';
import * as d3 from "d3";

export default class App extends Component {
  state = { geoJson: null };

  componentDidMount() {
    // fetch('../../datasets/ne_110m_populated_places_simple.geojson')
    //   .then(res => res.json())
    //   .then(data => this.setState({ places: data.features }));
  }

  render() {
    const { geoJson } = this.state;
    return (
      <div>
          <Map size={800}/>
      </div>
    );
  }
}
