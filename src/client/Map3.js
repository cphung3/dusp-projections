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
    function returnProjectionValueWhenValid(point, index) {
      const retVal = proj(point)
      // console.log('geogenerator: ', d3.geoPath().projection(proj(point)))
      if (retVal?.length) {
        if (retVal[index]) return retVal[index]
        return null
      }
      return 0
    }
    function convertGeoJson(point) {
      const string = geoGenerator(point);
      // console.log('path:', string)
      if (string != null) {
        return string
      }
      return null
    }
    let pathString = geoGenerator(geoJson)
    // console.log('real pathstring;', pathString)
    window.requestAnimationFrame(() => {
        this.setState({
           rotation: rotation + 0.2
         })
       })
    return (
        <div id="globe">
          <svg width={this.props.size} height={this.props.size} >
            <path d={pathString} />
            <g id="markers">
              {data.map((d, i) => (
                <path key={`marker-${uuid()}`} d={convertGeoJson(d)} />
                // <circle
                //   
                //   cx={ returnProjectionValueWhenValid(d.coordinates, 0)}
                //   cy={ returnProjectionValueWhenValid(d.coordinates, 1)}
                //   r={5}
                //   fill="#E91E63"
                //   stroke="#FFFFFF"
                //   onClick={() => handleMarkerClick(i)}
                //   // onMouseEnter={() => setIsRotate(false)}
                // />
              ))}
              {/* <circle
                cx={ returnProjectionValueWhenValid([8,48], 0)}
                cy={ returnProjectionValueWhenValid([8,48], 1)}
                r={ 10 }
                fill="#E91E63"
                className="marker"
              /> */}
            </g>  
            {/* <path d={pointString} /> */}
            {/* {data.map((d, i) => (
              <path
                key={`marker-${uuid()}`}
                cx={500}
                cy={520}
                r={5}
                fill="#E91E63"
                stroke="#FFFFFF"
                onClick={() => handleMarkerClick(i)}
                // onMouseEnter={() => setIsRotate(false)}
              />
            ))} */}
          </svg>
      </div>
    );
  }
}
