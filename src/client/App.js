import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
// import Map from './Map.js';
import { animations } from 'react-animation'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

import Map from './Map5.js';
import LandingOverlay from './components/LandingOverlay.js'
import Navbar from './components/Navbar.js'
import MapData from '../../datasets/ne_110m_admin_0_countries.geo.json'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D67474'
    },
    secondary: {
      main: '#FFE8D6'
    }
  }
});

export default class App extends Component {
  state = { 
    scroll: 0 , 
    clicked: false,
    submissions: {},
    isLoaded: false,
  };

  componentDidMount() {
    // fetch the spreadsheet submission data from server
    const tempObj = {};
    axios.get('/api/responses').then(res =>{
      console.log(res)
      res.data.responses.forEach((val, idx) => {
        let iso = val.iso;
        tempObj[iso] = tempObj[iso] || [];
        tempObj[iso].push(val)
      })
      this.setState({submissions: tempObj, isLoaded: true});
    })
  }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // }
  // handleScroll = (e) => {
  //   console.log(window.pageYOffset)
  //   this.setState({scroll: window.pageYOffset})
  // }

  render() {
    const { scroll, clicked, submissions, isLoaded } = this.state;
    return (
      <MuiThemeProvider theme={theme} >
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
            { isLoaded ? 
                <Map submissions={submissions} size={800} data={MapData}/>
                : null
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
