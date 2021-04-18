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
  constructor(props) {
    super(props);

    this.myReference = React.createRef();
    this.data = [10,20,40];
  }

  componentDidMount() {
    // fetch('../../datasets/ne_110m_admin_0_countries.geojson').then(res => res.json())
    // .then(geoJson => {
    //   this.setState({geoJson: geoJson})
    //   })
    // .then(() => {
      this.update();
    // })
  }

  update() {
    var container = d3.select(this.myReference.current);

    let width = 800
    let height = 500
    const sensitivity = 75
  
    let projection = d3.geoOrthographic()
    .scale(250)
    .center([0, 0])
    .rotate([0,-30])
    .translate([width / 2, height / 2])
  
  
    const initialScale = projection.scale()
    let path = d3.geoPath().projection(projection)
  
    let svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
  
    let globe = svg.append("circle")
    .attr("fill", "#EEE")
    .attr("stroke", "#000")
    .attr("stroke-width", "0.2")
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r", initialScale)
  
    svg.call(d3.drag().on('drag', () => {
      const rotate = projection.rotate()
      const k = sensitivity / projection.scale()
      projection.rotate([
        rotate[0] + d3.event.dx * k,
        rotate[1] - d3.event.dy * k
      ])
      path = d3.geoPath().projection(projection)
      svg.selectAll("path").attr("d", path)
    }))
      .call(d3.zoom().on('zoom', () => {
      if(d3.event.transform.k > 0.3) {
        projection.scale(initialScale * d3.event.transform.k)
        path = d3.geoPath().projection(projection)
        svg.selectAll("path").attr("d", path)
        globe.attr("r", projection.scale())
      }
      else {
        d3.event.transform.k = 0.3
      }
    }))
  
    let map = svg.append("g")
  
    // d3.json('../../datasets/ne_110m_admin_0_countries.geojson', function(err, d) {
    //   map.append("g")
    //     .attr("class", "countries" )
    //     .selectAll("path")
    //     .data(d.features)
    //     .enter().append("path")
    //     .attr("class", d => "country_" + d.properties.name.replace(" ","_"))
    //     .attr("d", path)
    //     .attr("fill", "white")
    //     .style('stroke', 'black')
    //     .style('stroke-width', 0.3)
    //     .style("opacity",0.8)
    // })
    
    //Optional rotate
    d3.timer(function(elapsed) {
      const rotate = projection.rotate()
      const k = sensitivity / projection.scale()
      projection.rotate([
        rotate[0] - 1 * k,
        rotate[1]
      ])
      path = d3.geoPath().projection(projection)
      svg.selectAll("path").attr("d", path)
    },200)
  }

  render() {
    return (
      <div id="globe" ref={this.myReference}>
      </div>
    );
  }
}
