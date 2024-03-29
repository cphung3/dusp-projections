import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { animations } from 'react-animation';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  overlay: {
    background: 'linear-gradient(125deg,#FFE8D6, #D67474);',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    opacity: 0.8,
    color: 'white',
    height: '100%',
    width: '100%',
    flexFlow: 'wrap',
  },
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    display: 'flex',
    flexFlow: 'wrap',
    paddingTop: '15vh',
  },
  heading: {
    width: '100%',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: '3vh',
  },
  subheading: {
    width: '100%',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 300,
    fontSize: '2.5vh',
  },
  subSubHeading: {
    width: '100%',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 300,
    fontSize: '11vh',
    marginBottom: '1.45vh',
  },
  bodyContainer: {
    width: '100%',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 300,
    fontSize: '2vh',
    display: 'flex',
    marginBottom: '1.5vh',
  },
  bodyText: {
    maxWidth: '40vw',
  },
  hidden: {
    // display: 'none',
  },
  button: {
    margin: '1vw',
    color: 'white',
    border: '.1vh solid white',
    marginRight: '1vw',
    padding: '.5vw 1vw',
    fontSize: '1.5vh',
  },
  link: {
    textDecoration: 'none',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '4vh'
  }
}));


export default function LandingOverlay({
  clicked, setClicked, hidden, setHidden
}) {
  const classes = useStyles();

  const handleClick = (e) => {
    setClicked(true);
    setTimeout(
      () => setHidden(true),
      350
    );
  };

  return (
    <div className={clsx(classes.overlay, { [classes.hidden]: hidden })} style={clicked ? { animation: animations.fadeOut, animationDuration: 3000 } : {}}>
      <div className={classes.container}>
        <div className={classes.heading}>
          PROJECTIONS 16
        </div>
        <div className={classes.subheading}>
          Measuring the city: the power of urban metrics
        </div>
        <div className={classes.subSubHeading}>
          Visualizing Cities
        </div>
        <div className={classes.bodyContainer}>
          <p className={classes.bodyText}>
            “Visualizing Cities” is an online exhibition that accompanies the
            “PROJECTIONS 16 - Measuring the city: the power of urban metrics” volume.
            The online exhibition  showcases how scholars and practitioners are using
            visual representations to investigate, interpret and communicate urban spaces.
          </p>
        </div>
        <div>
          <Button onClick={handleClick} variant="outlined" size="large" className={classes.button}>
            View Map
          </Button>
        </div>
        {/* <Link className={classes.link} to="/about">
          <Button variant="outlined" size="large" className={classes.button}>
            Learn More
          </Button>
        </Link> */}
      </div>
      <div className={classes.logoContainer}>
        <img alt="DUSP" src="/Dusp_png-01.png" style={{ width: '15vh' }} />
        {/* <ReactSVG id="MIT" src="/MIT-logo-gray-ltgray-72x38.svg" /> */}
      </div>
      <div style={{ fontSize: '.7vw' }}>© Copyright MIT, DUSP 2021 - 2028 | All rights reserved.</div>
    </div>
  );
}

LandingOverlay.propTypes = {
  hidden: PropTypes.bool.isRequired,
  setHidden: PropTypes.func.isRequired
};
