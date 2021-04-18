import React, { useState, useEffect } from 'react';
import './app.css';
import * as d3 from "d3";
import * as topojson from "topojson-client";

import useAnimationFrame from "./helpers/useAnimationFrame";
import useInterpolation from "./helpers/useInterpolation";


export default function Map(props) {
  const [pathString, setPathString] = useState([]);
  const [landPolygons, setLandPolygons] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [geoJson, setGeoJson] = useState({});
  const [projection, setProjection] = useState({});

  const toggle = () => {
    setModal(!modal);
  }

  useAnimationFrame(e => {
    // setRotation(150);
    // console.log('ojr', projection)
    // setRotation(e.time /100)
    if (projection.length) {
      projection.rotate([e.time/100])
    }
  }, []);
  
  useEffect(() => {
    // load data
    fetch('../../datasets/ne_110m_admin_0_countries.geojson').then(res => res.json())
    .then(geoJson => {
      setGeoJson(geoJson)
        const proj = d3.geoOrthographic().fitSize([props.size, props.size], geoJson).rotate([rotation])
        const geoGenerator = d3.geoPath().projection(proj)
        setPathString(geoGenerator(geoJson))
        setProjection(proj)
      });
  }, []);

  
  // setInterval(function(){ setRotation(rotation + 50) }, 1000);
  
  
  return (
    <div>
      <svg width={props.size} height={props.size} >
        <path d={pathString} />
      </svg>
      {rotation}
    </div>
  );
}
