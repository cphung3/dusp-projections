import React, { Component } from 'react';
import './app.css';
// import Map from './Map.js';
import * as d3 from "d3";

export default class Map extends Component {
        state = {
          rotation: 0,
          geoJson: null,
          pathString: "",
        }

  componentDidMount() {
    fetch('../../datasets/ne_110m_admin_0_countries.geojson').then(res => res.json())
    .then(geoJson => {
      this.setState({geoJson: geoJson})

      });
  }

  render() {
    const { geoJson, rotation } = this.state;
    const proj = d3.geoOrthographic().fitSize([this.props.size, this.props.size], geoJson).rotate([rotation])
    const geoGenerator = d3.geoPath().projection(proj)
    let pathString = geoGenerator(geoJson)
    window.requestAnimationFrame(() => {
        this.setState({
           rotation: rotation + 0.4
         })
       })
    return (
        <div id="globe">
          <svg width={this.props.size} height={this.props.size} >
            <path d={pathString} />
          </svg>
      </div>
    );
  }
}
