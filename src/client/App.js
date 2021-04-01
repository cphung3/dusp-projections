import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
// import Map from './Map.js';
import { animations } from 'react-animation'

import Map from './Map5.js';
import LandingOverlay from './components/LandingOverlay.js'
import Navbar from './components/Navbar.js'
import MapData from '../../datasets/ne_110m_admin_0_countries.geo.json'

export default class App extends Component {
  state = { scroll: 0 , clicked: false};

  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll, { passive: true })
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // }
  // handleScroll = (e) => {
  //   console.log(window.pageYOffset)
  //   this.setState({scroll: window.pageYOffset})
  // }

  render() {
    const { scroll, clicked } = this.state;
    return (
      <div className='block'>
        {/* <div className="foreground">
          <Navbar />
        </div> */}
        <div className="foreground">
          <Navbar />
          <LandingOverlay />
        </div>
        {/* <div className={`reveal-main ${scroll > 200 ? 'active' : ""} `}></div> */}
        <div className="background">
          <Map size={800} data={MapData}/>
        </div>
      </div>
    );
  }
}
