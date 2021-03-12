import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import Globe from 'react-globe.gl';
import * as d3 from "d3";

export default class App extends Component {
  state = { places: null };

  componentDidMount() {
    fetch('../../datasets/ne_110m_populated_places_simple.geojson')
      .then(res => res.json())
      .then(data => this.setState({ places: data.features }));
  }

  render() {
    const { places } = this.state;
    return (
      <div>
          <Globe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

            labelsData={places}
            labelLat={d => d.properties.latitude}
            labelLng={d => d.properties.longitude}
            labelText={d => d.properties.name}
            labelSize={d => Math.sqrt(d.properties.pop_max) * 4e-4}
            labelDotRadius={d => Math.sqrt(d.properties.pop_max) * 4e-4}
            labelColor={() => 'rgba(255, 165, 0, 0.75)'}
            labelResolution={2}
            onLabelClick={() => alert("I am an alert box!")}
          />, 
      </div>
    );
  }
}
