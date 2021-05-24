import React, { useState, useEffect } from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

import Map from './Map';
import About from './About';
import LandingOverlay from './components/LandingOverlay';
import Navbar from './components/Navbar';
import MapData from '../../datasets/ne_110m_admin_0_countries.geo.json';
import RightDrawer from './components/RightDrawer';
import FilterSelect from './components/FilterSelect';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e8ba97'
    },
    secondary: {
      main: '#D67474'
    }
  }
});


export default function App() {
  const [submissions, setSubmissions] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [cardClicked, setCardClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [filterSelection, setFilterSelection] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState({});
  const [coordData, setCoordData] = useState([]);
  const [filteredCoordData, setFilteredCoordData] = useState([]);
  const [availibleKeywords, setAvailibleKeywords] = useState({});

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedCountry({});
  };

  const handleBack = () => {
    setCardClicked(false);
  };

  // set the size of the globe based on the size of the user's window
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 2;
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 150;

  useEffect(() => {
    const fetchData = async () => {
      axios.get('/api/keywords').then((res) => {
        setAvailibleKeywords(res.data.keywords);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    // fetch the spreadsheet submission data from server
    const fetchData = async () => {
      const tempObj = {};
      const tempCoordData = [];
      const addedPoints = new Set();
      axios.get('/api/responses').then((res) => {
        res.data.responses.forEach((val) => {
          const location = `${val.coordinates.lng},${val.coordinates.lat}`;
          const coord = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [val.coordinates.lng, val.coordinates.lat]
            },
            properties: {
              NAME: val.country,
              ISO_A3: val.iso,
              TIMESTAMP: val.timestamp,
            },
          };
          tempCoordData.push(coord);
          addedPoints.add(location);
          const { iso } = val;
          tempObj[iso] = tempObj[iso] || [];
          tempObj[iso].push(val);
        });
        setSubmissions(tempObj);
        setFilteredSubmissions(tempObj);
        setCoordData(tempCoordData);
        setFilteredCoordData(tempCoordData);
        setIsLoaded(true);
      });
    };
    fetchData();
  }, []);


  useEffect(() => {
    const newSubmissions = {};
    const circlesToRemove = [];
    if (filterSelection.length !== 0) {
      Object.entries(submissions).map((countrySubmissions) => {
        const [iso, submission] = countrySubmissions;
        submission.map((val) => {
          const tags = val.keywords;
          const filteredArray = filterSelection.filter(tag => tags.includes(tag));
          newSubmissions[iso] = newSubmissions[iso] || [];

          // if (filteredArray.length === filterSelection.length) AND condition,
          // must satisfy all of the user's filters

          // if current submission's tags has at least one of the user's selected filters,
          // then include it (OR condition)
          if (filteredArray.length) {
            newSubmissions[iso].push(val);
          } else {
            // remove the coordinate data used for the circles using the ID of the submission
            circlesToRemove.push(val.timestamp);
          }
          return true;
        });
        return true;
      });
      // filter out any country's coord data that is supposed to be removed
      const newCoordData = coordData.filter(coord => !circlesToRemove.includes(coord.properties.TIMESTAMP));
      setFilteredSubmissions(newSubmissions);
      setFilteredCoordData(newCoordData);
    } else if (isLoaded) {
      setFilteredSubmissions(submissions);
      setFilteredCoordData(coordData);
    }
  }, [filterSelection]);

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route path="/map">
            <div className="block">
              <div className={hidden ? 'foreground' : 'foreground foreground-zIndex'}>
                <Navbar />
                <LandingOverlay hidden={hidden} setHidden={setHidden} sizeVw={vw} sizeVh={vh} />
              </div>
              <div className="background">
                { isLoaded
                  ? (
                    <div>
                      <FilterSelect
                        handleBack={handleBack}
                        filterSelection={filterSelection}
                        setFilterSelection={setFilterSelection}
                        availibleKeywords={availibleKeywords}
                      />
                      <Map
                        open={drawerOpen}
                        setSelectedCountry={setSelectedCountry}
                        selectedCountry={selectedCountry}
                        handleDrawerOpen={handleDrawerOpen}
                        handleDrawerClose={handleDrawerClose}
                        handleBack={handleBack}
                        submissions={filteredSubmissions}
                        coordData={filteredCoordData}
                        sizeVw={vw}
                        sizeVh={vh}
                        data={MapData}
                      />
                      <RightDrawer
                        selectedCountry={selectedCountry}
                        submissions={filteredSubmissions}
                        open={drawerOpen}
                        cardClicked={cardClicked}
                        setCardClicked={setCardClicked}
                        handleBack={handleBack}
                        handleDrawerClose={handleDrawerClose}
                      />
                    </div>
                  )
                  : null
                }
              </div>
            </div>
          </Route>
          <Route path="/about">
            <Navbar />
            <About />
          </Route>
          <Redirect from="/" to="/map" />
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}
