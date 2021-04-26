import React, { Component } from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { animations } from 'react-animation'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

import Map from './Map5.js';
import Grid from './Grid.js';
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
    coordData: [],
    isLoaded: false,
  };

  componentDidMount() {
    // fetch the spreadsheet submission data from server
    const tempObj = {};
    const coordData = [];
    const addedPoints = new Set()
    axios.get('/api/responses').then(res =>{
      res.data.responses.forEach((val, idx) => {
        const location = `${val.coordinates.lng},${val.coordinates.lat}`;
        if (!addedPoints.has(location)) {
          let coord = { 
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [val.coordinates.lng, val.coordinates.lat]
            },
          }
          coordData.push(coord);
          addedPoints.add(location);
        }
        let iso = val.iso;
        tempObj[iso] = tempObj[iso] || [];
        tempObj[iso].push(val)
      })
      this.setState({submissions: tempObj, coordData: coordData, isLoaded: true});
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
    const { scroll, clicked, submissions, coordData, isLoaded } = this.state;
    return (
      <Router>
        <MuiThemeProvider theme={theme} >
          <Switch>
            <Route path="/map">
              <div className='block'>
                <div className="foreground">
                  <Navbar />
                  <LandingOverlay />
                </div>
                <div className="background">
                  { isLoaded ? 
                      <Map submissions={submissions} coordData={coordData} size={800} data={MapData}/>
                      : null
                  }
                </div>
              </div>
            </Route>
            <Route path="/grid">
              <Navbar />
              <Grid submissions={submissions}></Grid>
            </Route>
            <Redirect from="/" to="/map" />
          </Switch>
        </MuiThemeProvider>
      </Router>
    );
  }
}
