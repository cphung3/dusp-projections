import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { animations } from 'react-animation';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

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
    paddingTop: 200,
  },
  heading: {
    width: '100%',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: 30,
  },
  subHeading: {
    width: '100%',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 300,
    fontSize: 90,
    marginBottom: 40,
  },
  bodyContainer: {
    width: '100%',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 300,
    fontSize: 16,
    display: 'flex',
    marginBottom: 70,
  },
  bodyText: {
    maxWidth: 600,
  },
  hidden: {
    // display: 'none',
  },
  button: {
    margin: theme.spacing(1),
    color: 'white',
    border: '1px solid white',
    marginRight: 20,
  },
  link: {
    textDecoration: 'none',
  },
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
          PROJECTIONS
        </div>
        <div className={classes.subHeading}>
          Visualizing Cities
        </div>
        <div className={classes.bodyContainer}>
          <div className={classes.bodyText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            In aliquet praesent leo ipsum, imperdiet tempor, quam.
            Curabitur nisl facilisis libero sed habitant interdum.
            Etiam non amet, quis eu ut rutrum aenean.
            Nunc cras accumsan pellentesque lacus sed sed facilisis blandit urna.
          </div>
        </div>
        <Button onClick={handleClick} variant="outlined" size="large" className={classes.button}>
          View Map
        </Button>
        <Link className={classes.link} to="/about">
          <Button variant="outlined" size="large" className={classes.button}>
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}

LandingOverlay.propTypes = {
  hidden: PropTypes.bool.isRequired,
  setHidden: PropTypes.func.isRequired
};
