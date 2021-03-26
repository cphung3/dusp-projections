import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
// import Map from './Map.js';
import { animations } from 'react-animation'


import Map from './Map3.js';
import LandingOverlay from './components/LandingOverlay.js'

export default class App extends Component {
  state = { scroll: 0 , clicked: false};

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll = (e) => {
    console.log(window.pageYOffset)
    this.setState({scroll: window.pageYOffset})
  }
  handleClick = (e) => {
    this.setState({clicked: true});
  }
  render() {
    const { scroll, clicked } = this.state;
    return (
      <div className='block'>
            <div onClick={this.handleClick} className="foreground" style={clicked ? {animation: animations.slideOut} : {}}>
              <LandingOverlay />
            </div>
            {/* <div className={`reveal-main ${scroll > 200 ? 'active' : ""} `}></div> */}
            <div className="background">
              <Map size={800}/>
            </div>
      </div>
    );
  }
}
