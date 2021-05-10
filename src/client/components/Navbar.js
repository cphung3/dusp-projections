import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    position: 'absolute',
    left: '44vw',
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: '1.2vw',
    color: 'white',
  },
  tab: {
    fontFamily: 'Roboto',
    fontWeight: 300,
    fontSize: '.9vw',
    color: 'white',
    cursor: 'pointer',
  },
  navigation: {
      justifyContent: 'space-between',
      display: 'flex',
      minWidth: '6vw',
      marginRight: '1vw',
      position: 'absolute',
      right: '10px'
  },
  container: {
    // backgroundColor: '#526355',
    background: 'linear-gradient(125deg, #FFE8D6, #D67474)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    opacity: 0.8,
    borderBottom: '.5px solid white',
  },
  link: {
    textDecoration: 'none',
  },
  toolbar: {
    minHeight: '6vh',
    maxHeight: '6vh',
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <AppBar elevation={0} position="static" className={classes.container}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              VISUALIZING CITIES
            </Typography>
            <div className={classes.navigation}>
              <Link className={classes.link} to="/map">
                <Typography variant="h6" className={classes.tab}>
                  Map
                </Typography>
              </Link> 
              <Link className={classes.link}  to="/grid">
                <Typography variant="h6" className={classes.tab}>
                  Grid
                </Typography>
              </Link>
            </div>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
    </div>
  );
}