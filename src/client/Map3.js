import React, { Component } from 'react';
import './app.css';
// import Map from './Map.js';
import * as d3 from "d3";

import uuid from 'react-uuid'

// const data = [
//   { name: '1', coordinates: [-73.9919, 40.7529] },
//   { name: '2', coordinates: [-70.0007884457405, 40.75509010847814] },
//   { name: '3', coordinates: [8, 48] },
// ]

const data = [
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [8, 48]
    },
    "properties": {
      "name": "Germany"
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [155, 110]
    },
    "properties": {
      "name": "Greenland"
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [286, 40]
    },
    "properties": {
      "name": "New York"
    }
  }
]

const handleMarkerClick = (i) => {
  // eslint-disable-next-line no-alert
  alert(`Marker: ${JSON.stringify(data[i])}`)
}


export default class Map extends Component {
        state = {
          rotation: 0,
          geoJson: null,
          isRotating: true,
        }

  componentDidMount() {
    fetch('../../datasets/ne_110m_admin_0_countries.geojson').then(res => res.json())
    .then(geoJson => {
      this.setState({geoJson: geoJson})
      });
  }
  stopRotate = () => {
    this.setState({isRotating: false})
  }
  resumeRotate = () => {
    this.setState({isRotating: true})
  }

  render() {
    const { geoJson, rotation, isRotating } = this.state;
    const sensitivity = 75;
    
    const proj = d3.geoOrthographic().fitSize([this.props.size, this.props.size], geoJson).rotate([rotation])
    const k = sensitivity / proj.scale()
    const drag = d3.drag().on('drag', () => {
      const rotate = proj.rotate()
      proj.rotate([
        rotate[0] + d3.event.dx * k,
        rotate[1] - d3.event.dy * k
      ])
    })
    const geoGenerator = d3.geoPath().projection(drag)
    function returnProjectionValueWhenValid(point, index) {
      const retVal = proj(point)
      if (retVal?.length) {
        if (retVal[index]) return retVal[index]
        return null
      }
      return 0
    }
    function convertGeoJson(point) {
      const path = geoGenerator(point);
      if (typeof path === "string") {
        if (!path.includes('MNaN')) {
          return path
        }
      }
      return null
    }

    let pathString = geoGenerator(geoJson)
    let points = data.map((datum, i) => (
      <path key={`marker-${uuid()}`} d={convertGeoJson(datum)} />
    ))
    window.requestAnimationFrame(() => {
      if (isRotating) {
        this.setState({
           rotation: (rotation + 0.2) % 360
         })
        } 
       })
    
    return (
        <div 
          id="globe"
        >
          <svg 
              onMouseEnter={this.stopRotate} 
              onMouseLeave={this.resumeRotate} 
              width={this.props.size} 
              height={this.props.size} >
            <path d={pathString} />
            <g id="markers">
              {points}
            </g>  
          </svg>
      </div>
    );
  }
}
