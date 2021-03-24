import React, { useState, useEffect } from 'react';
import './app.css';
import Globe from 'react-globe.gl';
import ImageModal from './components/ImageModal.js';
import * as THREE from 'three';
import * as topojson from "topojson-client";

export default function Map() {
  const [places, setPlaces] = useState([]);
  const [modal, setModal] = useState(false);
  const [landPolygons, setLandPolygons] = useState([]);
  // const [hover, setHover] = useState();

  // useEffect(() => {
  //   console.log('Fetching')
  //   fetch('../../datasets/ne_110m_populated_places_simple.geojson')
  //     .then(res => res.json())
  //     .then(data => setPlaces(data.features));
  // }, [])

  const toggle = () => {
    setModal(!modal);
  }
  const polygonsMaterial = new THREE.MeshLambertMaterial({ color: 'white', side: THREE.DoubleSide });

  useEffect(() => {
    // load data
    fetch('//unpkg.com/world-atlas/land-110m.json').then(res => res.json())
      .then(landTopo => {
        setLandPolygons(topojson.feature(landTopo, landTopo.objects.land).features);
      });
  }, []);

  return (
    <div>
          <Globe
          backgroundColor="rgba(255,255,255,1)"
          showGlobe={true}
          showAtmosphere={false}
          polygonsData={landPolygons}
          polygonCapMaterial={polygonsMaterial}
          polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
        />;
        {/* <Globe
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
        /> */}
        {/* <ImageModal toggle={toggle} modal={modal}/> */}
    </div>
  );
}
