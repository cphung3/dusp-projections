import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './app.css';


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

const useStyles = makeStyles({
  block: {
    display: 'flex', /* required */
    flexFlow: 'row nowrap', /* required */
    overflow: 'hidden',
  },
  background: {
    boxSizing: 'border-box', /* required */
    width: '100%', /* required */
    height: '100vh',
    minHeight: '100vh',
    flex: 'none', /* required */
    marginLeft: '-100%',
  },
  foreground: {
    boxSizing: 'border-box', /* required */
    width: '100%', /* required */
    height: '100vh',
    minHeight: '100vh',
    flex: 'none', /* required */
  },
  zIndex: {
    zIndex: 10,
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
  const [availableKeywords, setAvailableKeywords] = useState({});
  const [clicked, setClicked] = useState(false);
  const classes = useStyles();

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

  // get the available filters from submission sheet
  useEffect(() => {
    const fetchData = async () => {
      axios.get('/api/keywords').then((res) => {
        setAvailableKeywords(res.data.keywords);
      });
    };
    fetchData();
  }, []);

  // fetch the spreadsheet submission data from server
  useEffect(() => {
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

  // filter submissions based on user selected tags
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
          <Route exact path="/">
            <div className={classes.block}>
              <div className={hidden ? classes.foreground : `${classes.foreground} ${classes.zIndex}`}>
                <Navbar setHidden={setHidden} setClicked={setClicked} handleDrawerClose={handleDrawerClose} />
                <LandingOverlay clicked={clicked} setClicked={setClicked} hidden={hidden} setHidden={setHidden} sizeVw={vw} sizeVh={vh} />
              </div>
              <div className={classes.background}>
                { isLoaded
                  ? (
                    <div>
                      <FilterSelect
                        handleBack={handleBack}
                        filterSelection={filterSelection}
                        setFilterSelection={setFilterSelection}
                        availableKeywords={availableKeywords}
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
                        filterSelection={filterSelection}
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
          {/* <Redirect from="/" to="/map" /> */}
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}
