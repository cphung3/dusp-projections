import React, { useState, useEffect } from 'react';
import './app.css';
import Globe from 'react-globe.gl';
import ImageModal from './components/ImageModal.js';
// import * as d3 from "d3";

export default function Map() {
  const [places, setPlaces] = useState([]);
  const [modal, setModal] = useState(false);
  // const [hover, setHover] = useState();

  useEffect(() => {
    console.log('Fetching')
    fetch('../../datasets/ne_110m_populated_places_simple.geojson')
      .then(res => res.json())
      .then(data => setPlaces(data.features));
  }, [])

  const toggle = () => {
    setModal(!modal);
  }

  return (
    <div>
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          // labelAltitude={d => d === hover ? 0.06 : 0}
          // lineHoverPrecision={0}
          labelsData={places}
          labelLat={d => d.properties.latitude}
          labelLng={d => d.properties.longitude}
          labelText={d => d.properties.name}
          labelSize={d => Math.sqrt(d.properties.pop_max) * 4e-4}
          labelDotRadius={d => Math.sqrt(d.properties.pop_max) * 4e-4}
          labelColor={() => 'rgba(255, 165, 0, 0.75)'}
          labelResolution={2}
          onLabelClick={() => toggle()}
          // onLabelHover={setHover}
          // labelsTransitionDuration={10}
        />
        <ImageModal toggle={toggle} modal={modal}/>
    </div>
  );
}
