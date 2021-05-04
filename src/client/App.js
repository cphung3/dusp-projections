import React, { useState, useEffect } from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

import Map from './Map.js';
import Grid from './Grid.js';
import LandingOverlay from './components/LandingOverlay.js'
import Navbar from './components/Navbar.js'
import MapData from '../../datasets/ne_110m_admin_0_countries.geo.json'
import RightDrawer from './components/RightDrawer';

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




export default function App() {
  const [clicked, setClicked] = useState(false);
  const [submissions, setSubmissions] = useState({});
  const [coordData, setCoordData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [submissionData, setSubmissionData] = useState([])

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // set the size of the globe based on the size of the user's window
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 2;
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 150;

  useEffect(() => {
    // fetch the spreadsheet submission data from server
    const fetchData = async() => {
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
        setSubmissions(tempObj);
        setCoordData(coordData);
        setIsLoaded(true);
      })
    }
    fetchData();
  }, [])

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // }
  // handleScroll = (e) => {
  //   console.log(window.pageYOffset)
  //   this.setState({scroll: window.pageYOffset})
  // }

  return (
    <Router>
      <MuiThemeProvider theme={theme} >
        <Switch>
          <Route path="/map">
            <div className='block'>
              <div className="foreground">
                <Navbar />
                <LandingOverlay sizeVw={vw} sizeVh={vh}  />
              </div>
              <div className="background">
                { isLoaded ? 
                  (
                    <div>
                      <Map 
                        open={drawerOpen} 
                        setSelectedCountry={setSelectedCountry} 
                        setSubmissionData={setSubmissionData}
                        handleDrawerOpen={handleDrawerOpen} 
                        submissions={submissions} 
                        coordData={coordData} 
                        sizeVw={vw} 
                        sizeVh={vh} 
                        data={MapData}/>
                      <RightDrawer 
                        selectedCountry={selectedCountry} 
                        submissionData={submissionData}  
                        open={drawerOpen} 
                        handleDrawerClose={handleDrawerClose}/>
                    </div>
                  )
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
