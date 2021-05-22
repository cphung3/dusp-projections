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
  const [clicked, setClicked] = useState(false);
  const [submissions, setSubmissions] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [submissionData, setSubmissionData] = useState([]);
  const [cardClicked, setCardClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [filterSelection, setFilterSelection] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState({});
  const [coordData, setCoordData] = useState([]);
  const [filteredCoordData, setFilteredCoordData] = useState([]);

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
    // fetch the spreadsheet submission data from server
    const fetchData = async () => {
      const tempObj = {};
      const tempCoordData = [];
      const addedPoints = new Set();
      axios.get('/api/responses').then((res) => {
        res.data.responses.forEach((val, idx) => {
          const location = `${val.coordinates.lng},${val.coordinates.lat}`;
          if (!addedPoints.has(location)) {
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
          }
          const { iso } = val;
          tempObj[iso] = tempObj[iso] || [];
          tempObj[iso].push(val);
        });
        setSubmissions(tempObj);
        setFilteredSubmissions(tempObj);
        setCoordData(coordData);
        setFilteredCoordData(coordData);
        setIsLoaded(true);
      });
    };
    fetchData();
  }, []);

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // }
  // handleScroll = (e) => {
  //   console.log(window.pageYOffset)
  //   this.setState({scroll: window.pageYOffset})
  // }

  useEffect(() => {
    const newSubmissions = {};
    const circlesToRemove = [];
    if (filterSelection.length !== 0) {
      const filtersArray = filterSelection.map(val => val.title);
      Object.entries(submissions).map((countrySubmissions, key) => {
        const [iso, submission] = countrySubmissions;
        submission.map((val) => {
          const tags = val.keywords;
          const filteredArray = filtersArray.filter(tag => tags.includes(tag));
          // if current submission's tags matches the number of tags as the user's selected filters
          newSubmissions[iso] = newSubmissions[iso] || [];
          if (filteredArray.length === filterSelection.length) {
            newSubmissions[iso].push(val);
          } else {
            // remove the coordinate data used for the circles using the ID of the submission
            circlesToRemove.push(val.timestamp);
          }
        });
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
                      />
                      <Map
                        open={drawerOpen}
                        setSelectedCountry={setSelectedCountry}
                        selectedCountry={selectedCountry}
                        setSubmissionData={setSubmissionData}
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
